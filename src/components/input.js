import PropTypes from "prop-types"
import React from "react"

export default class Input extends React.Component {
  render() {
    return (
      <input
        {...this.props}
        className={`border-blue-300 border-2 rounded-md focus:outline-none focus:border-blue-600 ${this.props.className.join(' ')}`}
      />
    )
  }
}

Input.PropTypes = {
  className: PropTypes.string,
}
