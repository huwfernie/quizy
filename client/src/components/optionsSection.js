import React from 'react';

class OptionsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data !== this.props.data){
      this.setState({
        data: nextProps.data
      });
    }
  }

  selectAnswer = this.props.selectAnswer;

  render() {
  const { data } = this.state;

  return (
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
    );
  }
};


export default OptionsSection;
