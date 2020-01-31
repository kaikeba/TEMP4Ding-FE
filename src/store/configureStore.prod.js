import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { weight, reducers } from './modules/counter'
import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import models from './loader'
const loadingPlugin = createLoadingPlugin({ asNumber: true })

const configureStore = preloadedState =>
  init({
    plugins: [loadingPlugin],
    models,
    redux: {
      reducers: {
        // root: rootReducer,
        ...rootReducer
      },
      initialState: preloadedState,
      enhancers: [applyMiddleware(thunk)]
    }
  })
export default configureStore
