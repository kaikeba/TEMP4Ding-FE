import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

class RematchDemo extends Component {
  getInfoHandler = () => {
    const { getResult } = this.props
    return getResult()
  }

  render() {
    const { loading1, loading2, movie } = this.props
    return (
      <div>
        <div>loading1: {loading1}</div>
        <div>loading2: {loading2}</div>
        <Button onClick={this.getInfoHandler}>getInfo</Button>
        {movie &&
          movie.movies.map((item, index) => {
            return <div key={index}>电影名字：{item.commonSpecial}</div>
          })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    info: state.info,
    counter: state.data,
    movie: state.demo.data,
    loading1: state.loading.effects.getResult,
    loading2: state.loading.effects.getPaper,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getResult: () => dispatch.demo.getResult(),
    getPaper: () => dispatch.demo.getPaper(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RematchDemo)
