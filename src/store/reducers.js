import { combineReducers } from 'redux'
import { counterReducers } from './modules/counter'

export default combineReducers({ counterReducers })
