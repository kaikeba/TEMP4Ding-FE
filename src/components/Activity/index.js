import React, { Component } from 'react'

export default class Activity extends Component {
  static propTypes = {
    // validateId: PropTypes.string,
    // value: PropTypes.string,
    // onChange: PropTypes.func,
    // isPreview: PropTypes.bool
  }
  static defaultProps = {
    value: ''
  }
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  render() {
    return (
      <div className="init">
        activity init page
      </div>
    )
  }
}
