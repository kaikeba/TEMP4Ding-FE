import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { ddCompanyId } from '../../utils/env'
import { setStorage, getStorage } from '../../utils/index'
import * as dd from 'dingtalk-jsapi'
import actions from '@/store/actions'
import { Button, WhiteSpace, Toast } from 'antd-mobile'
import styles from './style.module.styl'

const cx = classNames.bind(styles)

class HOME extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      userInfo: {},
      text: '',
      adminFlag: true,
    }
  }

  componentWillMount() {
    document.title = '体温管理'
    if (getStorage('userInfo')) {
      let userInfo = JSON.parse(getStorage('userInfo'))
      let { mobile } = userInfo.data
      let { userId } = userInfo.data
      this.chechkoutIsAdmin(mobile, userId)
    } else {
      this.getDingTalkCode()
    }
  }

  chechkoutIsAdmin = async (mobile, userId) => {
    const { chechkoutIsAdmin, checkIsPromised } = this.props
    let isAdmin = await chechkoutIsAdmin(mobile)
    if (isAdmin) {
      this.setState({
        text: '你有管理员权限，请选择进入',
      })
    } else {
      this.setState({
        adminFlag: false,
      })
      let isPromised = await checkIsPromised(userId)
      this.linkUrl(isPromised)
    }
  }

  // 获取钉钉code
  getDingTalkCode = () => {
    let that = this

    if (dd.env.platform == 'notInDingTalk') {
      console.log('请用手机钉钉打开！')
      return
    }
    dd.ready(function() {
      dd.runtime.permission.requestAuthCode({
        corpId: 'ding3605591b852ace34', // 企业id
        onSuccess: function(info) {
          that.setState({
            code: info.code, // 通过该免登授权码可以获取用户身份
          })
          that.getUserInfo(info.code)
        },
        onFail: function(err) {
          console.error(err)
          Toast.info('网络繁忙，请稍后重试', 1)
        },
      })
    })
  }
  getUserInfo = async code => {
    const { getUserInfo } = this.props
    const resData = await getUserInfo(code)
    let { data } = resData
    let userInfo = JSON.stringify(data)
    setStorage('userInfo', userInfo)
    this.chechkoutIsAdmin(data.data.mobile, data.data.userId)
  }

  linkUrl = isPromised => {
    if (isPromised) {
      this.props.history.push({
        pathname: '/staff',
        state: {
          name: 'Life',
        },
      })
    } else {
      this.props.history.push({
        pathname: '/promised',
      })
    }
  }

  satsffLink = async () => {
    let userInfo = JSON.parse(getStorage('userInfo'))
    let { userId } = userInfo.data
    const { checkIsPromised } = this.props
    let isPromised = await checkIsPromised(userId)
    this.linkUrl(isPromised)
  }

  render() {
    const { text, code, adminFlag } = this.state
    const { loading2 } = this.props
    if (loading2 > 0) return null
    return (
      <div className={styles.contentbox}>
        <p className={styles.descript}>{text}</p>
        <Button
          type="primary"
          onClick={this.satsffLink}
          // onClick={this.getUserInfo}
        >
          员工端
        </Button>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <div style={{ display: adminFlag ? 'block' : 'none' }}>
          <Button
            type="primary"
            onClick={() => {
              this.props.history.push({ pathname: '/admin' })
            }}
          >
            登记端
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.demo.data,
    loading1: state.loading.effects.home.chechkoutIsAdmin,
    loading2: state.loading.effects.home.isPromised,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIsPromised: userId => dispatch.home.checkIsPromised(userId),
    chechkoutIsAdmin: mobile => dispatch.home.chechkoutIsAdmin(mobile),
    getUserInfo: code => dispatch.home.getUserInfo(code),
    getResult: () => dispatch.demo.getResult(),
    getPaper: () => dispatch.demo.getPaper(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOME)
