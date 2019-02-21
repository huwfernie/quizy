import React from 'react';

class QuestionCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      answer: '',
      status: 'pending'
    };
  }

  newQuestionPost(data){
    var url = './api/question';

    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((response) => {
      this.props.getQuestions();
    },
    (error) => {
      this.setState({
        error
      });
    })
  }

  render() {
  return (
    <section className="section-table create">
      <div className="item-list">
        <div className="container">
          <div className="item">question</div>
          <div className="item">option_1</div>
          <div className="item">option_2</div>
          <div className="item">option_3</div>
          <div className="item">option_4</div>
          <div className="item">answer</div>
          <div className="item">status</div>
          <div className="item">id</div>
        </div>
        <div className="container">
          <input className="item" defaultValue={this.state.question} placeholder="question" onChange={ event => this.setState({question: event.target.value}) } />
          <input className="item" defaultValue={this.state.option_1} placeholder="option_1" onChange={ event => this.setState({option_1: event.target.value}) } />
          <input className="item" defaultValue={this.state.option_2} placeholder="option_2" onChange={ event => this.setState({option_2: event.target.value}) } />
          <input className="item" defaultValue={this.state.option_3} placeholder="option_3" onChange={ event => this.setState({option_3: event.target.value}) } />
          <input className="item" defaultValue={this.state.option_4} placeholder="option_4" onChange={ event => this.setState({option_4: event.target.value}) } />
          <input className="item" defaultValue={this.state.answer} placeholder="correct answer" onChange={ event => this.setState({answer: event.target.value}) } />
          <input className="item" defaultValue={this.state.status} placeholder="status" onChange={ event => this.setState({status: event.target.value}) } />
          <div className="item" defaultValue='ID' >ID</div>
          <button onClick={ event => this.newQuestionPost(this.state) }>Create</button>
        </div>
      </div>
    </section>
    );
  }
};


export default QuestionCreate;
