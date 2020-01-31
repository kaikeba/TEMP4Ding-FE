import { combineReducers, bindActionCreators } from 'redux'
import { counterActions } from './modules/counter'
import { todoActions } from './modules/todo'
import store from './index'

export default bindActionCreators(
  {
    ...counterActions,
    ...todoActions,
  },
  store.dispatch,
)
