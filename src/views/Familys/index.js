import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './style.module.styl'
import { Button } from 'antd-mobile'

class Familys extends Component {
  componentDidMount() {
    this.init()
  }
  init() {
    this.props.getFamilyList()
  }
  render() {
    const { familyData } = this.props

    let familyDatas = [
      {
        id: 1234,
        userId: '123',
        name: '江忠林',
        members: '夫妻',
        mobile: '15770896001',
      },
    ]
    return (
      <>
        <div className={styles.itemBox}>
          {familyData.data &&
            familyData.data.map((item, index) => {
              return (
                <div key={index} className={styles.item}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemMembers}>{item.members}</div>
                </div>
              )
            })}
        </div>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => {
            this.props.history.push(`/AddFamilys`)
          }}
        >
          添加亲友
        </Button>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    familyData: state.familys.familyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFamilyList: () => dispatch.familys.getFamilyList(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Familys)
