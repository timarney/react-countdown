import React, { Component } from 'react'
import { observer } from 'mobx-react'
import TransitiveNumber from 'react-transitive-number'
const { object, string } = React.PropTypes

@observer class App extends Component {
  render () {
    const { store } = this.props
    return (
      <div>
        <button onClick={this.onReset}>RESET</button>
        <div>REACT</div>
        <div className='countdown'>
          <Unit type='minutes' store={store} />:
          <Unit type='seconds' store={store} />
        </div>
        <div className='code'>
          <a href='https://github.com/timarney/react-countdown'>https://github.com/timarney/react-countdown</a>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.props.store.resetTimer()
  }
}

App.propTypes = {
  store: object
}

@observer class Unit extends Component {
  render () {
    const { store, type } = this.props
    return (
      <TransitiveNumber>
        {store[type]}
      </TransitiveNumber>

    )
  }
}

Unit.propTypes = {
  store: object,
  type: string
}

export default App
