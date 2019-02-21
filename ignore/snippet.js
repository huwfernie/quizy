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
    },
    (error) => {
      this.setState({
        error
      });
    });
  }
}
