import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { List, WhiteSpace, Button, Modal, Toast } from 'antd-mobile'
import styles from './style.module.styl'
import { Icon, Input, Select, InputNumber } from 'antd'
import { getStorage } from '../../utils/index'

const { prompt } = Modal
const InputGroup = Input.Group
const { Option } = Select

export default class Pickers extends Component {
  state = {
    sValue: ['2013', '春'],
    PosterFlag: false, //海报显示
    ScrollId: getStorage('familyDataId'),
    degrees: 0,
  }
  onScrollChange = value => {
    this.setState({
      ScrollId: value,
    })
  }
  onChangeNumber = value => {
    this.setState({
      degrees: value,
    })
  }
  setDegreesData = () => {
    const { setDegrees } = this.props
    const { ScrollId, degrees } = this.state
    let userInfo = JSON.parse(getStorage('userInfo'))
    if (degrees === 0) {
      Toast.info('请输入温度', 1)
      return
    }
    setDegrees({
      userId: userInfo.data.userId,
      degrees: degrees,
      familyId: ScrollId,
    }).then(res => {
      if (res.data.code === 0) {
        Toast.info('录入成功', 1)
        this.handleCancel()
        this.props.initListData()
        return
      } else {
        Toast.info('网络繁忙', 1)
        this.handleCancel()
        return
      }
    })
  }
  handleCancel = () => {
    this.setState({
      PosterFlag: false,
    })
  }
  render() {
    const { familyData, initListData } = this.props
    return (
      <div className={styles.heights}>
        <div
          className={styles.item2}
          onClick={() => {
            this.props.linkFamily()
            let ScrollIds =
              this.props.familyData.data.length > 0
                ? this.props.familyData.data[0].id
                : 0
            this.setState({
              PosterFlag: true,
              ScrollId: ScrollIds,
            })
          }}
        >
          <Icon
            style={{ fontSize: '52px', marginTop: '20px' }}
            type="usergroup-add"
          />
          <span>记录亲友</span>
        </div>
        <Modal
          title="记录亲友体温"
          visible={this.state.PosterFlag}
          transparent
          onClose={this.handleCancel}
        >
          <InputGroup compact>
            <Select
              className={styles.selects}
              style={{ width: '100%' }}
              onChange={this.onScrollChange}
              getPopupContainer={triggerNode => triggerNode.parentNode}
            >
              {familyData.data &&
                familyData.data.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.name}
                    </Option>
                  )
                })}
            </Select>
          </InputGroup>
          <InputNumber
            min={30}
            max={41}
            step={0.1}
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
            保存体温
          </Button>
        </Modal>
      </div>
    )
  }
}
