import LeftNav from './LeftNav'
import React, { Component } from 'react'
import Reboot from 'material-ui/Reboot'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Reboot />
        <LeftNav />
      </div>
    )
  }
}

export default App
