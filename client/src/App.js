import React, { Component } from 'react'
import './App.scss'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {},
      myAnswer: null,
      answerID: null
    };
  }

  componentDidMount() {
    this.Question();
  }

  getQuestion() {
    fetch("http://localhost:4000/api/question/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
            myAnswer: null,
            answerID: null
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  Question = this.getQuestion.bind(this);

  render() {
    const { error, isLoaded, data, myAnswer, answerID } = this.state;
    if (error) {
      return <div>Error: {error.message || "Error"}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="section hero-section">
            <h1>Quizy</h1>
          </div>
          <div className="section question-section">
            <h2 className="question">{data.question}</h2>
          </div>
          <div className="section submit-section">
            <div className="button" data-my-answer={answerID} onClick={ event => this.submitAnswerPost(answerID)}>{ myAnswer || 'Pick your answer'}</div>
          </div>
          <div className="section options-section">
            <div className="option" id="option_1" onClick={ event => this.selectAnswer(event)}>
              {data.option_1}
            </div>
            <div className="option" id="option_2" onClick={ event => this.selectAnswer(event)}>
              {data.option_2}
            </div>
            <div className="option" id="option_3" onClick={ event => this.selectAnswer(event)}>
              {data.option_3}
            </div>
            <div className="option" id="option_4" onClick={ event => this.selectAnswer(event)}>
              {data.option_4}
            </div>
          </div>
        </div>
      );
    }
  }

  selectAnswer(e) {
    //get the option id
    const answerID = e.target.id.replace('option_','');
    const answer = 'Submit Answer: ' + answerID;

    //User selects a new answer
    if(answerID !== this.state.answerID) {
      //Update submit section
      this.setState({
        myAnswer: answer,
        answerID: answerID
      });
      this.removeSelectedBound();
      e.target.classList.add('selected');
    } else {
      // User has de-selected the same answer
      //Update submit section
      this.setState({
        myAnswer: null,
        answerID: null
      });
      //remove all options with selected class;
      e.target.classList.remove('selected');
    }
  }

  removeSelectedBound = this.removeSelected.bind(this);
  removeSelected(){
    const all = document.querySelectorAll('.selected');
    if(all) {
      all.forEach((node)=> {
        node.classList.toggle('selected');
      })
    }
  }

  submitAnswerGet(ans){
    if(ans){
      fetch(`http://localhost:4000/api/answer?id=${this.state.data.id}&answer=${ans}`)
        .then(res => res.json())
        .then((result) => {
          this.setState({
            answerID: null,
            myAnswer: result
          })
          setTimeout(this.Question,1000);
          setTimeout(this.removeSelectedBound,1000);
          // this.Question();
      });
    }
  }

  //update this to fetch and it should work
  submitAnswerPost(ans){
    var url = 'http://localhost:4000/api/answer';
    var data = { id: this.state.data.id, answer: ans };

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((response) => {
      this.setState({
        answerID: null,
        myAnswer: response
      })
      setTimeout(this.Question,1000);
      setTimeout(this.removeSelectedBound,1000);
      console.log('Success:', JSON.stringify(response));
    })
    .catch(error => console.error('Error:', error));
  }
}
export default App
