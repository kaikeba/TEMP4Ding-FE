import { handleActions } from 'redux-actions'
import { bindActionCreators } from 'redux'
import { createApiActionTypes, createAction, createApiReducers } from '../utils'
// import store from '../index'
const nameSpace = 'todo'

const initialState = {
  num: 10,
}

export const countConst = createApiActionTypes({
  INCREMENT: `${nameSpace}/INCREMENT`,
  DECREMENT: `${nameSpace}/DECREMENT`,
})

// action
export const increment = createAction(countConst.INCREMENT)
export const decrement = createAction(countConst.DECREMENT)

// reducer
const reducer = {
  ...createApiReducers([countConst.INCREMENT, countConst.DECREMENT]),
  [countConst.INCREMENT](state, action) {
    return {
      ...state,
      num: state.num + 10,
      requestings: {
        ...state.requestings,
        [countConst.INCREMENT]: false,
      },
      errors: {
        ...state.errors,
        [countConst.INCREMENT]: null,
      },
    }
  },
}

export const todoReducers = handleActions(reducer, initialState)
export const todoActions = { increment, decrement }
