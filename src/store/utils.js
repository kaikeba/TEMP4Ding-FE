// 以下代码引自cc-rabbit
// git@gitlab.yeshj.com:cctalk-front-end/rabbit.git
/**
 * 创建Action
 *
 * @export
 * @param actionType Action类型
 */
export function createAction(actionType) {
  return payload => ({
    type: actionType,
    payload,
  })
}

/**
 * 创建API Action
 *
 * @export
 * @param actionType Action类型
 * @param [func] 请求API方法，返回Promise
 * @returns 请求之前dispatch { type: ${actionType}_request }
 *          请求成功dispatch { type: ${actionType}, payload: ${resolveData} }
 *          请求失败dispatch { type: ${actionType}_failure, payload: ${rejectData} }
 */
export function createApiAction(actionType, func = () => {}) {
  return (params = {}, callback = { success: () => {}, failed: () => {} }, customActionType = actionType) => async (dispatch) => {
    try {
      dispatch({ type: `${customActionType}_request`, params })
      const data = await func(params)
      dispatch({ type: customActionType, params, payload: data })

      callback.success && callback.success({ payload: data })
      return data
    } catch (e) {
      dispatch({ type: `${customActionType}_failure`, params, payload: e })

      callback.failed && callback.failed({ payload: e })
    }
  }
}

/**
 * 创建API Action的三种ActionType
 *
 * @export
 * @param actionTypes ActionType列表
 * @returns API Action三种ActionType的集合, { GET_USER_REQUEST, GET_USER, GET_USER_FAILURE }
 *
 */
export function createApiActionTypes(actionTypes, initial = {}) {
  if (Array.isArray(actionTypes)) {
    return actionTypes.reduce((previous, current, index, array) => {
      const actionTypeValue = current.toLowerCase()
      previous[`${current}_REQUEST`] = `${actionTypeValue}_request`
      previous[current] = actionTypeValue
      previous[`${current}_FAILURE`] = `${actionTypeValue}_failure`
      return previous
    }, initial)
  }
  if (actionTypes && typeof actionTypes === 'object') {
    return Object.keys(actionTypes).reduce((previous, current, index, array) => {
      const actionTypeValue = actionTypes[current].toLowerCase()
      previous[`${current}_REQUEST`] = `${actionTypeValue}_request`
      previous[current] = actionTypeValue
      previous[`${current}_FAILURE`] = `${actionTypeValue}_failure`
      return previous
    }, initial)
  }
}

function isFunction(val) {
  return typeof val === 'function'
}

function ownKeys(object) {
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(object)
  }
  let keys = Object.getOwnPropertyNames(object)
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(object))
  }
  return keys
}

function reduceReducers(...reducers) {
  return (previous, current) => reducers.reduce((p, r) => r(p, current), previous)
}

export function handleAction(type, reducers, defaultState) {
  const typeValue = isFunction(type) ? type.toString() : type

  return (state = defaultState, action) => {
    // If action type does not match, return previous state
    if (action.type !== typeValue) return state

    const handlerKey = action.error === true ? 'throw' : 'next'

    // If function is passed instead of map, use as reducer
    if (isFunction(reducers)) {
      reducers.next = reducers.throw = reducers
    }

    // Otherwise, assume an action map was passed
    const reducer = reducers[handlerKey]

    return isFunction(reducer) ? reducer(state, action) : state
  }
}

export function handleApiActions(handlers, defaultState) {
  const reducers = ownKeys(handlers).map(type => handleAction(type, handlers[type]))
  const reducer = reduceReducers(...reducers)
  return typeof defaultState !== 'undefined' ? (state = defaultState, action) => reducer(state, action) : reducer
}

export function createApiReducers(actionTypes = []) {
  return actionTypes.reduce(
    (previous, current, index, array) => ({
      ...previous,
      [`${current}_request`](state) {
        return {
          ...state,
          requestings: { ...state.requestings, [current]: true },
          errors: { ...state.errors, [current]: null },
        }
      },
      [current](state, action) {
        return {
          ...state,
          requestings: { ...state.requestings, [current]: false },
          errors: { ...state.errors, [current]: null },
          payloads: {
            ...state.payloads,
            [current]: {
              params: action.params,
              payload: action.payload,
            },
          },
        }
      },
      [`${current}_failure`](state, action) {
        return {
          ...state,
          requestings: { ...state.requestings, [current]: false },
          errors: { ...state.errors, [current]: action.payload },
        }
      },
    }),
    {},
  )
}
