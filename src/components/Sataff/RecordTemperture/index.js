import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import QRCode from 'qrcode.react'
import { ddCompanyId } from '../../../utils/env'
import * as dd from 'dingtalk-jsapi'
import actions from '@/store/actions'
import { Icon, InputNumber } from 'antd'
import { List, WhiteSpace, Button, Modal, Toast } from 'antd-mobile'

import { getStorage, getQueryString } from '../../../utils/index'
import styles from './style.module.styl'
import Picker from '../../Picker/index'

const cx = classNames.bind(styles)

class HOME extends Component {
  constructor(props) {
    super(props)
    this.state = {
      PosterFlag: false,
      code: '',
      userInfo: {},
      text: '',
      curentuserId: '',
      degrees: 0,
    }
  }

  componentDidMount() {
    document.title = '体温管理'
    let userInfo = JSON.parse(getStorage('userInfo'))
    this.setState({
      userInfo: userInfo.data,
      curentuserId: `?userid=${userInfo.data.userId}&name=${userInfo.data.name}&title=${userInfo.data.title}`,
    })
    this.props.getFamilyList()
  }

  onChangeNumber = value => {
    this.setState({
      degrees: value.target.value,
    })
  }
  setDegreesData = () => {
    const { setDegrees } = this.props
    const { degrees } = this.state
    let userInfo = JSON.parse(getStorage('userInfo'))
    if (degrees === 0 || degrees === '') {
      Toast.info('请输入温度', 1)
      return
    }
    setDegrees({
      userId: userInfo.data.userId,
      degrees: degrees,
      familyId: '',
    }).then(res => {
      if (res.data.code === 0) {
        Toast.info('录入成功', 1)
        this.handleCancel()
        this.props.initListData()
        this.setState({
          degrees: '',
        })
        return
      } else {
        Toast.info('网络繁忙', 1)
        this.handleCancel()
        this.setState({
          degrees: '',
        })
        return
      }
    })
  }
  handleCancel = () => {
    this.setState({
      PosterFlag: false,
    })
  }
  linkFamily = () => {
    const { familyData } = this.props
  }

  linkUrl = () => {}

  render() {
    const { familyData, setDegrees, initListData } = this.props
    const { curentuserId, userInfo } = this.state
    return (
      <div className={styles.contentbox}>
        <p>请向记录人员出示此二维码</p>
        <div className={styles.qrcode}>
          <QRCode value={curentuserId} id="qrcode" size={180} />
        </div>
        <h2>{userInfo.name}</h2>
        <p>{userInfo.title}</p>
        <div className={styles.tempertureitem}>
          <div
            className={styles.item1}
            onClick={() => {
              this.setState({
                PosterFlag: true,
              })
            }}
          >
            <img
              className={styles.shoudong}
              src="https://img.kaikeba.com/80149182100202omao.png"
            />
            <span className={styles.shoudongdesc}>自行录入</span>
          </div>

          <Picker
            linkFamily={this.linkFamily}
            familyData={familyData}
            setDegrees={setDegrees}
            initListData={initListData}
          ></Picker>
        </div>
        <Modal
          title="自行录入体温"
          visible={this.state.PosterFlag}
          transparent
          onClose={this.handleCancel}
        >
          <input
            type="number"
            min={30}
            max={41}
            step={0.1}
            placeholder="请输入体温"
            className={styles.InputNumber}
            onChange={this.onChangeNumber}
          />
          {/*<InputNumber*/}
          {/*min={30}*/}
          {/*max={41}*/}
          {/*step={0.1}*/}
          {/*className={styles.InputNumber}*/}
          {/*onChange={this.onChangeNumber}*/}
          {/*/>*/}
          <Button
            type="primary"
            className={styles.addButton}
            onClick={() => {
              this.setDegreesData()
            }}
          >
            保存体温
          </Button>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movie: state.demo.data,
    loading1: state.loading.effects.getResult,
    loading2: state.loading.effects.getPaper,
    familyData: state.familys.familyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getResult: () => dispatch.demo.getResult(),
    getPaper: () => dispatch.demo.getPaper(),
    getFamilyList: () => dispatch.familys.getFamilyList(),
    setDegrees: payload => dispatch.familys.setDegrees(payload),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOME)
