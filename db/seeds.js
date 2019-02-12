const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useMongoClient: true });

const Question = require('../models/question');

Question.collection.drop();

const seedData = [{
  question: 'What\'s the biggest number?',
  option_1: '1',
  option_2: '2',
  option_3: '3',
  option_4: '4',
  answer: 4
},{
  question: 'What\'s the highest mountain?',
  option_1: 'Ben Nevis',
  option_2: 'Mt Etna',
  option_3: 'Mt Everest',
  option_4: 'Mt Killimanjaro',
  answer: 3
},{
  question: 'Who\'s a girl?',
  option_1: 'king George 1st',
  option_2: 'Queen Elizabeth',
  option_3: 'king George 3rd',
  option_4: 'king George 2nd',
  answer: 2
},{
  question: 'What\'s biggest?',
  option_1: 'a watermelon',
  option_2: 'an olive',
  option_3: 'a mango',
  option_4: 'a grape',
  answer: 1
}];

Question
  .create(seedData)
  .then(questions => console.log(`${questions.length} questions created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

/*
  To add seeds to your local database run : ~..... : node db/seeds.js
*/
