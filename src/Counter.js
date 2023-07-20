import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Counter extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onIncrement2: PropTypes.func.isRequired,
    onDecrement2: PropTypes.func.isRequired
  }

  incrementIfOdd = () => {
    if (this.props.value % 2 !== 0) {
      this.props.onIncrement()
    }
  }

  incrementAsync = () => {
    setTimeout(this.props.onIncrement, 1000)
  }

  render() {
    const { value, onIncrement, onDecrement, onIncrement2, onDecrement2 } = this.props
    return (
      <p>
        Clicked: {value} times
        {' '}
        <button className="button" onClick={onIncrement}>
          +
        </button>
        {' '}
        <button className="button" onClick={onDecrement}>
          -
        </button>
        {' '}
        <button className="button" onClick={onIncrement2}>
          +2
        </button>
        {' '}
        <button className="button" onClick={onDecrement2}>
          -2
        </button>
        {' '}
        <button className="button" onClick={this.incrementIfOdd}>
          Increment if odd
        </button>
        {' '}
        <button className="button" onClick={this.incrementAsync}>
          Increment async
        </button>
      </p>
    )
  }
}

export default Counter
