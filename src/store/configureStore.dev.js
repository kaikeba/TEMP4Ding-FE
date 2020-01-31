import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { init } from '@rematch/core'
import { weight, reducers } from './modules/counter'
import createLoadingPlugin from '@rematch/loading'
import models from './loader'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const loadingPlugin = createLoadingPlugin({ asNumber: true })

const configureStore = preloadedState => {
  const store = init({
    plugins: [loadingPlugin],
    models,
    redux: {
      reducers: {
        // root: rootReducer,
        ...rootReducer,
      },
      initialState: preloadedState,
      enhancers: [composeEnhancers(applyMiddleware(thunk, createLogger()))],
    },
  })
  return store
}

export default configureStore
