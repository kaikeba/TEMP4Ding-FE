import React from 'react'
// import Loadable from 'react-loadable'

// // 通用的过场组件

// export default Loadable({
//   loader: import('./index.js'),
//   loading: loadingComponent,
// })

import Loadable from 'react-loadable'

const loadingComponent = () => {
  return <div>loading</div>
}
const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: loadingComponent,
})

export default class App extends React.Component {
  render() {
    return <LoadableComponent />
  }
}
