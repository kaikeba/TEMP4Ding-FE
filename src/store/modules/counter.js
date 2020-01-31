import { createApiActionTypes, createAction, createApiReducers } from '../utils'
import { handleActions } from 'redux-actions'
import { bindActionCreators } from 'redux'
// import store from '../index'
const nameSpace = 'counter'

const initialState = {
  num: 10,
}

export const countConst = createApiActionTypes({
  INCREMENT: `${nameSpace}/INCREMENT`,
  DECREMENT: `${nameSpace}/DECREMENT`,
})


// action
export const counterIncrement = createAction(countConst.INCREMENT)
export const counterDecrement = createAction(countConst.DECREMENT)

// reducer
const reducer = {
  ...createApiReducers([
    countConst.INCREMENT,
    countConst.DECREMENT,
  ]),
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

export const counterReducers = handleActions(reducer, initialState)
export const counterActions = {counterIncrement, counterDecrement}
