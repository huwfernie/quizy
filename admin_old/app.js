console.log('App');

getQuestion();

function getQuestion() {
  fetch('http://localhost:4000/api/allQuestions/')
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        displayResult(result);
      });
}

function displayResult(allQuestions) {

  const target = document.querySelector('.item-list');

  for(let i=0; i<allQuestions.length; i++) {
    const container = document.createElement('div');
    container.classList.add('container');

    const questionData = allQuestions[i];
    console.log(questionData);
    const keys = ['question','option_1','option_2','option_3','option_4','answer','status','id'];
    keys.forEach((key,iter)=>{
      const part = document.createElement('div');
      part.innerHTML = questionData[key];
      part.classList.add(key);
      part.classList.add('item');
      if(iter == questionData.answer) {
        part.classList.add('correct');
      }
      if (key==='id') {
        const link = document.createElement('a');
        link.href=`../question/${questionData[key]}`
        link.appendChild(part);
        container.appendChild(link);
      }
      container.appendChild(part);
      console.log(questionData[key]);
    });
    target.appendChild(container);
  }
}

//
// <div class="container">
//   <div class="item question">i</div>
//   <div class="item question-id">i</div>
//   <div class="item option-1">i</div>
//   <div class="item option-2">i</div>
//   <div class="item option-3">i</div>
//   <div class="item option-4">i</div>
//   <div class="item answer">i</div>
// </div>
