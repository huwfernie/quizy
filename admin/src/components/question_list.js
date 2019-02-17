import React from 'react';
import QuestionListItem from './question_list_item';

const QuestionList = (props) => {
  // console.log(props);
  const deleteMe =  props.deleteMe;
  const questionList = props.questions.map((question) => {
    return (
      <QuestionListItem deleteMe={deleteMe} question={question} key={question.id} />
    )
  });

  return (
    <section className="section-table">
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
        {questionList}
      </div>
    </section>
  );
};


export default QuestionList;
