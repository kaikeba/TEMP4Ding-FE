import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getStorage } from '../../utils/index'
import { Button } from 'antd-mobile'
import styles from './style.module.styl'

class HOME extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: {},
    }
  }

  componentDidMount() {
    document.title = '体温管理'
    let userInfo = JSON.parse(getStorage('userInfo'))
    let { userId } = userInfo.data
    this.setState({
      userId: { userId: userId },
    })
  }

  promiseGuaranteeFn = async () => {
    const { promiseGuarantee } = this.props
    let code = await promiseGuarantee(this.state.userId)
    if (code === 0) {
      this.linkUrl()
    } else {
      console.log('失败')
    }
  }

  linkUrl = () => {
    this.props.history.push({
      pathname: '/staff',
      state: {
        name: 'Life',
      },
    })
  }

  render() {
    const { text, code } = this.state
    return (
      <div className={styles.contentbox}>
        <h3>承诺书</h3>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了做好全集团新型冠状病毒感染的肺炎防控工作，切实维护
          全集团人员身体健康和生命安全，集团对全员进行个人体温测定。
        </p>
        <p className={styles.p1}>本人在此郑重承诺：</p>
        <p className={styles.p2}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人严格按照国家及集团规范和要求，做到及时、真实、准确
          登记个人体温。如本人隐瞒事实或者提供虚假信息或者不及时提
          供信息及其它违反国家及集团规范要求的，本人自愿承担以下责 任：
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.公司有权单方面终止劳动合同，并不承担任何经济补偿和
          或赔偿金；
        </p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.对公司及其他人员造成损失的，本人自愿承担法律责任及
          其经济赔偿。
        </p>
        <div className={styles.promisedbtn}>
          <Button onClick={this.promiseGuaranteeFn} type="primary">
            同意并进入
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.demo.data,
    loading1: state.loading.effects.getResult,
    loading2: state.loading.effects.getPaper,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    promiseGuarantee: userId => dispatch.home.promiseGuarantee(userId),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOME)
