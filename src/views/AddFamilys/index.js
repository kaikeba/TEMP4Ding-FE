import React, { Component } from 'react'
import { connect } from 'react-redux'

import classNames from 'classnames/bind'
import styles from './style.module.styl'
import { Button } from 'antd-mobile'
import { getStorage } from '../../utils/index'
import {
  NavBar,
  Icon,
  WingBlank,
  WhiteSpace,
  InputItem,
  Radio,
  List,
  Toast,
} from 'antd-mobile'
const { RadioItem } = Radio
class AddFamilys extends Component {
  state = {
    value: parseInt(this.props.location.state.members),
    name: this.props.location.state.name,
    data: [
      { value: 1, label: '父母', extra: 'details' },
      { value: 2, label: '夫妻', extra: 'details' },
      { value: 3, label: '儿女', extra: 'details' },
      { value: 4, label: '恋人', extra: 'details' },
      { value: 5, label: '室友', extra: 'details' },
      { value: 6, label: '朋友', extra: 'details' },
      { value: 7, label: '其他', extra: 'details' },
    ],
    label: '父母',
  }
  componentDidMount() {
    this.init()
  }
  init() {
    this.props.getFamilyList()
  }
  onChanges = (value, label) => {
    this.setState({
      value,
      label,
    })
  }
  onInputChange = name => {
    this.setState({
      name,
    })
  }
  AddFamilysList = () => {
    const { addFamily } = this.props
    const { name, value } = this.state
    const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if (!reg.test(name)) {
      Toast.info('请输入正确姓名', 1)
      return
    }
    let userInfo = JSON.parse(getStorage('userInfo'))

    addFamily({
      userId: userInfo.data.userId,
      name: name,
      members: value,
      mobile: userInfo.data.mobile,
    }).then(res => {
      if (res.data.code === 0) {
        Toast.info('保存成功', 1)
        this.props.history.push({
          pathname: '/staff',
          state: {
            name: 'redTab',
          },
        })
      }
    })
  }
  ChangeFamilysList = () => {
    const { changeFamily } = this.props
    const { name, value } = this.state
    const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if (!reg.test(name)) {
      Toast.info('请输入正确姓名', 1)
      return
    }
    let userInfo = JSON.parse(getStorage('userInfo'))

    changeFamily({
      userId: userInfo.data.userId,
      name: name,
      members: value,
      mobile: userInfo.data.mobile,
      id: this.props.location.state.id,
    }).then(res => {
      if (res.data.code === 0) {
        Toast.info('保存成功', 1)
        this.props.history.push({
          pathname: '/staff',
          state: {
            name: 'redTab',
          },
        })
      }
    })
  }
  deleteFamilysList = () => {
    const { deleteFamily } = this.props
    deleteFamily({ id: this.props.location.state.id }).then(res => {
      if (res.code === 0) {
        Toast.info('删除成功', 1)
        this.props.history.push({
          pathname: '/staff',
          state: {
            name: 'redTab',
          },
        })
      }
    })
  }
  render() {
    const { familyData } = this.props
    const { value, data, name } = this.state
    return (
      <>
        <div>
          <div>
            <List renderHeader={() => '亲友姓名'}>
              <InputItem onChange={this.onInputChange} value={name}></InputItem>
            </List>
          </div>
          <div>
            <List renderHeader={() => '亲友关系'}>
              {data.map((item, index) => (
                <RadioItem
                  key={index}
                  checked={value === item.value}
                  onChange={() => this.onChanges(item.value, item.label)}
                >
                  {item.label}
                </RadioItem>
              ))}
            </List>
          </div>
        </div>
        {this.props.location.state.deliveryPrice === 0 ? (
          <Button
            type="primary"
            className={styles.addButton}
            onClick={this.AddFamilysList}
          >
            保存
          </Button>
        ) : (
          <Button
            type="primary"
            className={styles.addButton}
            onClick={this.ChangeFamilysList}
          >
            保存
          </Button>
        )}
        {this.props.location.state.deliveryPrice === 1 ? (
          <Button
            type="warning"
            className={styles.deleteButton}
            onClick={this.deleteFamilysList}
          >
            删除
          </Button>
        ) : (
          ''
        )}
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    info: state.info,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFamilyList: () => dispatch.familys.getFamilyList(),
    addFamily: payload => dispatch.familys.addFamily(payload),
    changeFamily: payload => dispatch.familys.changeFamily(payload),
    deleteFamily: payload => dispatch.familys.deleteFamily(payload),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFamilys)
