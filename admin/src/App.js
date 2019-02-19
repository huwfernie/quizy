import React, { Component } from 'react';
import './App.css';
import QuestionList from './components/question_list';
import QuestionCreate from './components/question_create';
import QuestionUpdate from './components/question_update';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      questions: [],
      myAnswer: null,
      answerID: null,
      activeQuestion: {}
    };
  }

  componentDidMount() {
    this.Questions();
  }

  getQuestions() {
    fetch('./api/allQuestions/')
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
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
    const url = `./api/question/${id}`;
    return fetch(url, {
        method: "DELETE"
    })
    .then(response => {
      this.Questions();
    })
  }
  updateQuestion(id, data) {
    const url = `./api/question/${id}`;
    return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
      this.Questions();
      this.UpdateActiveQuestion({
          question: '',
          option_1: '',
          option_2: '',
          option_3: '',
          option_4: '',
          answer: '',
          status: ''
        });
    })
  }
  updateActiveQuestion(data) {
    this.setState({
      activeQuestion: data
    })
  }
  Questions = this.getQuestions.bind(this);
  DeleteQuestion = this.deleteQuestion.bind(this);
  UpdateQuestion = this.updateQuestion.bind(this);
  UpdateActiveQuestion = this.updateActiveQuestion.bind(this);

  render() {
    return (
      <div className="App">
        <h1>Quizzy Admin Page</h1>
        <h2>All Questions in the database:</h2>
          <QuestionList deleteMe={this.DeleteQuestion} updateActiveQuestion={this.UpdateActiveQuestion} questions={this.state.questions} />
        <h2>Create a new question:</h2>
          <QuestionCreate getQuestions={this.Questions} newQuestion={{}}/>
        <h2>Edit an old question:</h2>
          <QuestionUpdate updateQuestion={this.UpdateQuestion} question={this.state.activeQuestion}/>
      </div>
    );
  }
}

export default App;
