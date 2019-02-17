import React from 'react';

const QuestionListItem = (props) => {
  const question = props.question.question;
  const id = props.question.id;
  const option_1 = props.question.option_1;
  const option_2 = props.question.option_2;
  const option_3 = props.question.option_3;
  const option_4 = props.question.option_4;
  const answer = props.question.answer;
  const status = props.question.status;

  return (
    <div className="container">
      <div className="item question">{question}</div>
      <div className={"item option-1" + (answer === 1 ? " correct" : "")}>{option_1}</div>
      <div className={"item option-2" + (answer === 2 ? " correct" : "")}>{option_2}</div>
      <div className={"item option-3" + (answer === 3 ? " correct" : "")}>{option_3}</div>
      <div className={"item option-4" + (answer === 4 ? " correct" : "")}>{option_4}</div>
      <div className="item answer">{answer}</div>
      <div className="item status">{status}</div>
      <a className="item id" href="./#"><div>{id}</div></a>
    </div>
  );
};

export default QuestionListItem;
