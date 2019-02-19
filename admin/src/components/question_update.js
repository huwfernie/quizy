import React from 'react';

class QuestionUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      answer: '',
      status: ''
    };

    this.updateQuestion = this.props.updateQuestion;
    this.clearAll = this.clearAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.question !== this.props.question){
      this.setState({
        question: nextProps.question.question,
        option_1: nextProps.question.option_1,
        option_2: nextProps.question.option_2,
        option_3: nextProps.question.option_3,
        option_4: nextProps.question.option_4,
        answer: nextProps.question.answer,
        status: nextProps.question.status,
        id: nextProps.question.id
      });
    }
  }

  clearAll(){
    this.setState({
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      answer: '',
      status: '',
      id: ''
    });
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleSubmit(event) {
    this.updateQuestion(this.state.id, this.state);
    this.clearAll();
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
          <input className="item input-item" value={this.state.question} onChange={ (event) => this.handleChange('question', event.target.value) } />
          <input className="item input-item" value={this.state.option_1} onChange={ (event) => this.handleChange('option_1', event.target.value) } />
          <input className="item input-item" value={this.state.option_2} onChange={ (event) => this.handleChange('option_2', event.target.value) } />
          <input className="item input-item" value={this.state.option_3} onChange={ (event) => this.handleChange('option_3', event.target.value) } />
          <input className="item input-item" value={this.state.option_4} onChange={ (event) => this.handleChange('option_4', event.target.value) } />
          <input className="item input-item" value={this.state.answer} onChange={ (event) => this.handleChange('answer', event.target.value) } />
          <input className="item input-item" value={this.state.status} onChange={ (event) => this.handleChange('status', event.target.value) } />
          <input className="item input-item" defaultValue='ID' />
            <button onClick={ event => this.handleSubmit() }>Update</button>
        </div>
      </div>
    </section>
    );
  }
};


export default QuestionUpdate;
