import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

class SubmitSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      star: this.props.star,
      myAnswer: this.props.myAnswer
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.star !== this.props.star){
      this.setState({
        star: nextProps.star
      });
    }
    if(nextProps.myAnswer !== this.props.myAnswer){
      this.setState({
        myAnswer: nextProps.myAnswer
      });
    }
  }

  render() {
  const { star, myAnswer } = this.state;

  return (
    <div className="section submit-section">
      <CSSTransitionGroup
        transitionName="score"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={2000}>
        {star}
      </CSSTransitionGroup>
      <div className="button">{ myAnswer || 'Tap an answer'}</div>
    </div>
    );
  }
};


export default SubmitSection;
