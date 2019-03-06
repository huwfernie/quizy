import React, { Component } from 'react';
import './App.scss';
import Music from './components/music';
import Star from './components/star';
import SubmitSection from './components/submitSection';
import OptionsSection from './components/optionsSection';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: {
        question: '...loading a question'
      },
      myAnswer: null,
      answerID: null,
      score: 0,
      questionCount: -1,
      muted: true,
      items: [1],
      star: false
    };
  }

  componentDidMount() {
    this.Question();
  }

  playThis(audio,volume) {
    audio = new Audio(`./assets/${audio}.mp3`);
    audio.volume = (volume/10);
    audio.play();
  };

  getQuestion() {
    fetch("./api/question/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
            myAnswer: null,
            answerID: null,
            questionCount: this.state.questionCount + 1
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  Question = this.getQuestion.bind(this);

  selectAnswer(event) {
    //get the option id
    const answerID = event.target.id.replace('option_','');

    //User selects a new answer
    if(answerID) {
      //Update submit section
      this.setState({
        answerID: answerID
      });
      event.target.classList.add('selected');
      this.submitAnswer(answerID);
    }
  }
  SelectAnswer = this.selectAnswer.bind(this);

  removeSelected(){
    const all = document.querySelectorAll('.selected');
    if(all) {
      all.forEach((node)=> {
        node.classList.toggle('selected');
      })
    }
  }
  RemoveSelected = this.removeSelected.bind(this);

  handleWinOrLoose(response) {
    if (response === 'Winner') {
      this.HandleWin();
    } else {
      this.HandleLoose();
    }
    //reset the board
    this.setState({
      answerID: null,
      myAnswer: response,
    });
    setTimeout(this.Question,2000);
    setTimeout(this.RemoveSelected,2000);
  }
  HandleWinOrLoose = this.handleWinOrLoose.bind(this);

  handleWin() {
    this.setState ({
      score: this.state.score + 1
    });
    if (!this.state.muted) {
      this.playThis('ding',9);
    }
    this.setState({star: true});
    setTimeout(()=>{this.setState({ star: false})}, 500);
  }
  HandleWin = this.handleWin.bind(this);

  handleLoose() {
    if (!this.state.muted) {
      this.playThis('gong',2);
    }
    let score = document.querySelector('.score');
    score.classList.add('shake');
    setTimeout(()=>{score.classList.remove('shake')}, 1500);
    let sections = document.querySelectorAll('.section, .option');
    sections.forEach((section, index) => {
      setTimeout(()=>{
        section.classList.add('shake');
        setTimeout(()=>{section.classList.remove('shake')}, 750);
      }, 100*index);
    });
  }
  HandleLoose = this.handleLoose.bind(this);

  updateMuted() {
    if (this.state.muted) {
      this.setState({
        muted: false
      })
    } else {
      this.setState({
        muted: true
      })
    }
  }
  UpdateMuted = this.updateMuted.bind(this);

  submitAnswer(ansID){
    var url = './api/answer';
    var data = { id: this.state.data.id, answer: ansID };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{ 'Content-Type': 'application/json' }
    }).then(res => res.json())
    .then((response) => {
      this.HandleWinOrLoose(response)
    },
    (error) => {
      this.setState({
        error
      });
    })
  }

  render() {
    const star = (this.state.star) ? <Star /> : null;

    const { error, isLoaded, data, myAnswer, score, questionCount } = this.state;
    if (error) {
      return <div>Error: {error.message || "Error"}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div className="section hero-section">
            <h1>Quizzy</h1>
            <Music muted={this.state.muted} updateMuted={this.UpdateMuted} />
            <div className="score">
              {score}/{questionCount}
            </div>
          </div>
          <div className="section question-section">
            <h2 className="question">Q: {data.question}</h2>
          </div>
          <SubmitSection star={star} myAnswer={myAnswer} />
          <OptionsSection data={data} selectAnswer={this.SelectAnswer} />
        </div>
      );
    }
  }
}
export default App
