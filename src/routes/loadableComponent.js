import React from 'react'
import Loadable from 'react-loadable'
import { isDevEnv } from '@/utils/env'

const Loading = (props) => {
  const { error } = props
  const isDev = isDevEnv
  if (error && isDev) {
    return (
      <div>
        <p>{error.stack ? error.stack : ''}</p>
      </div>
    )
  }
  return <div />
}

const loadableComponent = (loader, render) => {
  const config = {
    loader,
    loading: Loading,
    delay: 1000,
  }
  if (render) {
    config.render = render
  }
  return Loadable(config)
}

export default loadableComponent
