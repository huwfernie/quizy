import React, { Component } from 'react';
import './App.css';
import QuestionList from './components/question_list'
import QuestionCreate from './components/question_create'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      myAnswer: null,
      answerID: null
    };
  }

  componentDidMount() {
    this.Questions();
  }

  getQuestions() {
    fetch('http://localhost:4000/api/allQuestions/')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            questions: result
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
  deleteQuestion(id) {
    const url = `http://localhost:4000/api/question/${id}`;
    return fetch(url, {
        method: "DELETE",
    })
    .then(response => {
      // response.json()
      this.Questions();
    }) // parses response to JSON
  }
  Questions = this.getQuestions.bind(this);
  DeleteQuestion = this.deleteQuestion.bind(this);

  render() {
    return (
      <div className="App">
        <h1>Quizzy Admin Page</h1>
        <h2>All Questions in the database:</h2>
          <QuestionList deleteMe={this.DeleteQuestion} questions={this.state.questions} />
        <h2>Create a new question:</h2>
          <QuestionCreate getQuestions={this.Questions} newQuestion={{}}/>
      </div>
    );
  }
}

export default App;
