import React from 'react'
import Routes from 'router'
import classNames from 'classnames/bind'
import styles from './style.styl'
const cx = classNames.bind(styles)

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props, nextProps) {

  }


  componentDidMount() {
    // do something here
  }

  render() {
    return (
      <div className={cx('content')}>
        你好
          <Routes />
      </div>
    )
  }
}
export default App
