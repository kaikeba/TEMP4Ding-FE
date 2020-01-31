import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { ddCompanyId } from '../../utils/env'
import * as dd from 'dingtalk-jsapi'
import actions from '@/store/actions'
import { Button, Picker, Modal, Toast } from 'antd-mobile'
import { getStorage, getQueryString } from '../../utils/index'
import styles from './style.module.styl'
import { InputNumber } from 'antd'

const cx = classNames.bind(styles)
const seasons = [
  [
    {
      label: '35',
      value: '35',
    },
    {
      label: '36',
      value: '36',
    },
    {
      label: '37',
      value: '37',
    },
    {
      label: '38',
      value: '38',
    },
    {
      label: '39',
      value: '39',
    },
    {
      label: '40',
      value: '40',
    },
    {
      label: '41',
      value: '41',
    },
    {
      label: '42',
      value: '42',
    },
    {
      label: '43',
      value: '43',
    },
    {
      label: '44',
      value: '44',
    },
  ],
  [
    {
      label: '0',
      value: '0',
    },
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },

    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
  ],
]

class HOME extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      userInfo: {},
      text: '',
      currentUserId: '',
      sataffUserId: '',
      thirdName: '',
      thirdtitle: '',
      degrees: '',
      PosterFlag: false,
    }
  }

  componentDidMount() {
    document.title = '扫码登记'
    let userInfo = JSON.parse(getStorage('userInfo'))
    this.setState({
      currentUserId: userInfo.data.userId,
      userInfo: userInfo.data,
    })
  }

  sweepCode = () => {
    let that = this
    dd.ready(function() {
      dd.biz.util.scan({
        type: 'all', // type 为 all、qrCode、barCode，默认是all。
        onSuccess: function(data) {
          that.setState({
            sataffUserId: getQueryString('userid', data.text),
            thirdName: getQueryString('name', data.text),
            thirdtitle: getQueryString('title', data.text),
            PosterFlag: true,
          })
        },
        onFail: function(err) {
          console.error(err)
          Toast.info('网络繁忙，请稍后重试', 1)
        },
      })
    })
  }
  getTemperTure = value => {
    this.setState({
      // degrees:Number(value[0]) + Number(value[1]/10)
      degrees: value,
    })
  }

  onChangeNumber = value => {
    this.setState({
      degrees: value.target.value,
    })
  }

  setDegreesData = async () => {
    const { setDegreesDataAdmin } = this.props
    const { degrees, sataffUserId, currentUserId } = this.state
    if (degrees === 0 || degrees === '') {
      Toast.info('请输入体温', 1)
      return
    }
    let data = {
      userId: sataffUserId,
      degrees: degrees,
      adminUserId: currentUserId,
    }
    let code = await setDegreesDataAdmin(data)
    if (code === 0) {
      Toast.info('录入成功', 2)
      this.handleCancel()
      this.setState({
        degrees: '',
      })
      return
    } else {
      Toast.info('网络繁忙', 2)
      this.handleCancel()
      this.setState({
        degrees: '',
      })
      return
    }
  }

  handleCancel = () => {
    this.setState({
      PosterFlag: false,
    })
  }

  render() {
    const { thirdName, thirdtitle } = this.state
    return (
      <div>
        {/*<div className={styles.formtable}>*/}
        {/*<div className={styles.userinfo}>*/}
        {/*<h2>员工姓名</h2>*/}
        {/*<p>title</p>*/}
        {/*<div>*/}
        {/*<Picker*/}
        {/*data={seasons}*/}
        {/*cols={1}*/}
        {/*className="forss"*/}
        {/*cascade={false}*/}
        {/*onOk={this.getTemperTure}*/}
        {/*value={['36','5']}*/}
        {/*>*/}
        {/*<div>点击输入温度</div>*/}
        {/*</Picker>*/}
        {/*<Button type="primary">确认登记</Button>*/}
        {/*</div>*/}
        {/*</div>*/}
        {/*</div>*/}
        <div className={styles.contentbox}>
          <Button onClick={this.sweepCode} type="primary">
            扫码登记
          </Button>
        </div>
        <Modal
          title="体温登记"
          visible={this.state.PosterFlag}
          transparent
          onClose={this.handleCancel}
        >
          <h2 className={styles.names}>{thirdName}</h2>
          <p className={styles.titles}>{thirdtitle}</p>
          <input
            type="number"
            min={30}
            max={41}
            step={0.1}
            placeholder="请输入体温"
            className={styles.InputNumber}
            onChange={this.onChangeNumber}
          />
          <Button
            type="primary"
            className={styles.addButton}
            onClick={() => {
              this.setDegreesData()
            }}
          >
            确认登记
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDegreesDataAdmin: data => dispatch.home.setDegreesDataAdmin(data),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOME)
