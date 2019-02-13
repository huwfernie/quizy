import React, { Component } from 'react'
import './App.scss'
class App extends Component {

render() {
    return (
      <div className="App">
        <div className="section hero-section">
          <h1>Quizy</h1>
        </div>
        <div className="section question-section">
          <h2 className="question">Question text</h2>
        </div>
        <div className="section submit-section">
          <div className="button">Pick your answer</div>
        </div>
        <div className="section options-section">
          <div className="option">
            option text
          </div>
          <div className="option">
            option text
          </div>
          <div className="option">
            option text
          </div>
          <div className="option">
            option text
          </div>
        </div>
      </div>
    )
  }
}
export default App
