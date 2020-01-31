import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styles from './style.module.styl'
import { Button } from 'antd-mobile'
import { NavBar, Icon, WingBlank, WhiteSpace } from 'antd-mobile'
const cx = classNames.bind(styles)
const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>
    Block
  </div>
)
export default class Activity extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          开课吧 PC和移动端脚手架
        </NavBar>

        <WingBlank>
          <WhiteSpace />
          <Button type="primary">开课吧 PC和移动端脚手架</Button>
          <WhiteSpace />
          <Button type="primary" disabled>
            primary disabled
          </Button>
          <WhiteSpace />
        </WingBlank>
      </div>
    )
  }
}
