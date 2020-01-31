import React, { Component } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://xxxxx@xxxxxx.xxx.com/xxx',
})

class App extends Component {
  componentDidCatch(error) {
    Sentry.captureException(error)
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    )
  }
}
export default App
