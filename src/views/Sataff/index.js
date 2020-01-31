import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { ddCompanyId } from '../../utils/env'
import * as dd from 'dingtalk-jsapi'
import actions from '@/store/actions'
import { Button, TabBar, Picker } from 'antd-mobile'
import { Icon } from 'antd'
import { setStorage, getStorage, formatDate } from '../../utils/index'

import styles from './style.module.styl'
import RecordTemperture from '../../components/Sataff/RecordTemperture'

const cx = classNames.bind(styles)
const season = [
  {
    label: '亲友1',
    value: '1',
  },
  {
    label: '亲友2',
    value: '2',
  },
  {
    label: '亲友3',
    value: '3',
  },
  {
    label: '亲友4',
    value: '4',
  },
]
let params = {
  userId: '',
  familyId: '',
  recordsData: [],
  query: {
    size: 500,
    current: 1,
  },
  changeText: '切换亲友',
}

class HOME extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      userInfo: {},
      selectedTab: this.props.location.state.name || 'Life',
      fullScreen: false,
      tempertureList: [],
      familyName: '',
      familyAvatar: 'https://img.kaikeba.com/51743282100202ltki.png',
      data: [
        {
          id: 1234,
          createTime: 1580176800000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1580169600000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1580184000000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1580205600000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1580119200000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1580133600000,
          degrees: 37.5,
          enterType: 1,
        },

        {
          id: 1234,
          createTime: 1580047200000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1580004000000,
          degrees: 37.5,
          enterType: 1,
        },
        {
          id: 1234,
          createTime: 1579917600000,
          degrees: 37.5,
          enterType: 1,
        },
      ],
    }
  }

  componentDidMount() {
    document.title = '体温记录'
    this.initListData()
    this.props.getFamilyList()
    this.init()
  }

  initListData = familyId => {
    let userInfo = JSON.parse(getStorage('userInfo'))
    this.setState({
      userInfo: userInfo.data,
    })
    params.userId = userInfo.data.userId
    params.familyId = familyId || ''
    if (params.familyId === '') {
      this.setState({
        changeText: '切换亲友',
      })
    } else {
      let familyList = this.props.familyData.data
      for (let i = 0; i < familyList.length; i++) {
        if (familyList[i].id === familyId) {
          this.setState({
            familyName: familyList[i].name,
          })
        }
      }
      this.setState({
        changeText: '切换本人',
      })
    }
    this.props.getTemperTureList(params).then(res => {
      let list = res.records.sort(function(a, b) {
        return b.createTime - a.createTime
      })
      let tempertureList = formatDate(list)

      this.setState({
        tempertureList,
      })
    })
  }
  init = () => {
    const { getList } = this.props
    getList().then(res => {
      this.setState({
        recordsData: res.data.data.records,
      })
    })
  }

  handleOk = value => {
    this.initListData(value[0])
    // this.setState({
    //   changeText: '切换亲友',
    // })
  }
  changeTab = item => {
    this.setState({
      selectedTab: 'redTab',
    })
  }
  formatTime = UnixTime => {
    let date = new Date(UnixTime)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? `0${m}` : m
    let d = date.getDate()
    d = d < 10 ? `0${d}` : d
    let h = date.getHours()
    h = h < 10 ? `0${h}` : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second
    return `${h}:${minute}:${second}`
  }
  membersList = value => {
    const data = {
      '1': '父母',
      '2': '夫妻',
      '3': '儿女',
      '4': '恋人',
      '5': '室友',
      '6': '朋友',
      '7': '其他',
    }
    return data[value]
  }

  render() {
    const { familyData, listData } = this.props
    const { changeText } = this.state
    let keyMap = {
      id: 'value',
      name: 'label',
    }
    let newFamilyData = []

    if (familyData.data) {
      newFamilyData = JSON.parse(JSON.stringify(familyData.data))
      newFamilyData.unshift({
        label: '本人',
        value: '',
      })
      newFamilyData.map(item => {
        let obj = newFamilyData[item]
        for (var key in item) {
          let newKey = keyMap[key]
          if (newKey) {
            item[newKey] = item[key]
            delete item[key]
          }
        }
      })
    }

    const { userInfo, recordsData, tempertureList } = this.state
    return (
      <div className={styles.contentbox}>
        <div className={styles.fixbox}>
          {/*<div onClick={() => {this.props.history.push({ pathname: '/recordTemperture' })}} className={styles.showqrcode}></div>*/}
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="体温记录"
              key="Life"
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://img.kaikeba.com/12630282100202lufq.png) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://img.kaikeba.com/23630282100202ytjw.png) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selected={this.state.selectedTab === 'Life'}
              onPress={() => {
                this.setState({
                  selectedTab: 'Life',
                })
              }}
              data-seed="logId"
            >
              <div className={styles.temperature}>
                <div className={styles.temperatureuserinfo}>
                  <div className={styles.userinfoleft}>
                    <div className={styles.avator}>
                      <img
                        src={
                          params.familyId === ''
                            ? userInfo.avatar
                            : this.state.familyAvatar
                        }
                      />
                    </div>
                    <div className={styles.name}>
                      <h2>
                        {params.familyId === ''
                          ? userInfo.name
                          : this.state.familyName}
                      </h2>
                      <p
                        style={{
                          display: params.familyId === '' ? 'block' : 'none',
                        }}
                      >
                        {userInfo.title}
                      </p>
                    </div>
                  </div>
                  <div className={styles.userinforight}>
                    <Picker
                      data={newFamilyData}
                      title="选择"
                      cols={1}
                      className="forss"
                      onOk={this.handleOk}
                    >
                      <Button
                        className={styles.addfirly}
                        size="small"
                        type="primary"
                      >
                        {changeText}
                      </Button>
                    </Picker>
                  </div>
                </div>
                <div className={styles.recordsDataLists}>
                  {tempertureList &&
                    tempertureList.map((item, index) => {
                      return (
                        <div key={index} className={styles.listday}>
                          <p className={styles.listdayp}>
                            {item.dataList[0].showTime}
                            <span>
                              {item.dataList[0].showTime === '今天' ||
                              item.dataList[0].showTime === '昨天'
                                ? item.date.slice(5)
                                : ''}
                            </span>
                          </p>
                          {item.dataList &&
                            item.dataList.map((items, index) => {
                              return (
                                <div
                                  key={index}
                                  className={styles.recordsDataList}
                                >
                                  <div
                                    className={cx({
                                      degrees: true,
                                      degrees1: items.degrees > 37,
                                    })}
                                  >
                                    {`${items.degrees}`}°
                                  </div>
                                  <span
                                    className={cx({
                                      listspan: true,
                                      listspan2: items.enterType !== 1,
                                    })}
                                  >
                                    {items.enterType === 1 ? '自行录入' : ''}
                                  </span>
                                  <div className={styles.createTime}>
                                    {this.formatTime(items.createTime)}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      )
                    })}

                  {/*<div className={styles.recordsDataLists}>今天</div>*/}
                  {/*{recordsData &&*/}
                  {/*recordsData.map((item, index) => {*/}
                  {/*return (*/}
                  {/*<div className={styles.recordsDataList} key={index}>*/}
                  {/*<div className={styles.degrees}>{item.degrees}</div>*/}
                  {/*<div className={styles.enterType}>*/}
                  {/*{item.enterType === 1 ? <div>自行录入</div> : ''}*/}
                  {/*</div>*/}
                  {/*<div className={styles.createTime}>*/}
                  {/*{this.formatTime(item.createTime)}*/}
                  {/*</div>*/}
                  {/*</div>*/}
                  {/*)*/}
                  {/*})}*/}
                </div>
              </div>
            </TabBar.Item>

            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    marginTop: '-20px',
                    zIndex: '19',
                    background:
                      'url(https://img.kaikeba.com/52930282100202rywi.png) center center /  70px 68px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    marginTop: '-20px',
                    zIndex: '19',
                    background:
                      'url(https://img.kaikeba.com/44930282100202jlge.png) center center /  70px 68px no-repeat',
                  }}
                />
              }
              title=""
              key="add"
              selected={this.state.selectedTab === 'add'}
              onPress={() => {
                this.setState({
                  selectedTab: 'add',
                })
              }}
              data-seed="logId2"
              id="logId2"
            >
              <RecordTemperture
                changeTab={this.changeTab}
                familyData={familyData.data}
                initListData={this.initListData}
              ></RecordTemperture>
            </TabBar.Item>

            <TabBar.Item
              icon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://img.kaikeba.com/35630282100202bilf.png) center center /  21px 21px no-repeat',
                  }}
                />
              }
              selectedIcon={
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    background:
                      'url(https://img.kaikeba.com/60730282100202ilgm.png) center center /  21px 21px no-repeat',
                  }}
                />
              }
              title="亲友管理"
              key="Koubei"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                })
              }}
              data-seed="logId1"
            >
              <div>
                <div className={styles.itemBox}>
                  {familyData.data &&
                    familyData.data.map((item, index) => {
                      return (
                        <div key={index} className={styles.item}>
                          <div className={styles.itemName}>{item.name}</div>
                          <div className={styles.itemMembers}>
                            {this.membersList(item.members)}
                          </div>
                          <Icon
                            // style={{ fontSize: '52px', marginTop: '20px' }}
                            // color='black'
                            onClick={() => {
                              this.props.history.push({
                                pathname: '/AddFamilys',
                                state: {
                                  deliveryPrice: 1,
                                  name: item.name,
                                  members: item.members,
                                  id: item.id,
                                },
                              })
                            }}
                            type="edit"
                          />
                        </div>
                      )
                    })}
                </div>
                <Button
                  type="primary"
                  className={styles.addButton}
                  onClick={() => {
                    this.props.history.push({
                      pathname: '/AddFamilys',
                      state: {
                        deliveryPrice: 0,
                      },
                    })
                  }}
                >
                  添加亲友
                </Button>
              </div>
            </TabBar.Item>
          </TabBar>
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
    familyData: state.familys.familyData,
    listData: state.familys.listData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getResult: () => dispatch.demo.getResult(),
    getPaper: () => dispatch.demo.getPaper(),
    getFamilyList: () => dispatch.familys.getFamilyList(),
    getTemperTureList: params => dispatch.home.getTemperTureList(params),
    getList: () => dispatch.familys.getList(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOME)
