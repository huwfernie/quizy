process.env.NODE_ENV = 'test';

const should = require('chai').should();
const expect = require('chai').expect;
const app = require('supertest')(require('../server'));
const Question = require('../models/question');

const testData = [{
  question: 'What\'s the biggest number?',
  option_1: '1',
  option_2: '2',
  option_3: '3',
  option_4: '4',
  answer: 4,
  status: 'approved'
},{
  question: 'What\'s the highest mountain?',
  option_1: 'Ben Nevis',
  option_2: 'Mt Etna',
  option_3: 'Mt Everest',
  option_4: 'Mt Killimanjaro',
  answer: 3,
  status: 'approved'
},{
  question: 'Who\'s a girl?',
  option_1: 'king George 1st',
  option_2: 'Queen Elizabeth',
  option_3: 'king George 3rd',
  option_4: 'king George 2nd',
  answer: 2,
  status: 'approved'
},{
  question: 'What\'s biggest?',
  option_1: 'a watermelon',
  option_2: 'an olive',
  option_3: 'a mango',
  option_4: 'a grape',
  answer: 1,
  status: 'approved'
}];

beforeEach((done) => {
  Question.collection.drop();
  Question.create(testData, done);
});

//
// Test get all route
//
describe('GET /api/allQuestions', () => {

  it('should return a 200 response', (done) => {
    app.get('/api/allQuestions')
      .expect(200, done);
  });

  it('should return an array', (done) => {
    app.get('/api/allQuestions')
      .end((err, res) => {
        res.body.should.be.an('array');
        done();
      });
  });

  it('should return 4 questions', (done) => {
    app.get('/api/allQuestions')
      .end((err, res) => {
        res.body.should.have.length(4);
        done();
      });
  });

});

//
// Test get random question route
//
describe('GET /api/question', () => {

  it('should return a 200 response', (done) => {
    app.get('/api/question')
      .expect(200, done);
  });

  it('should return an object', (done) => {
    app.get('/api/question')
      .end((err, res) => {
        res.body.should.be.an('object');
        done();
      });
  });

  it('should return 1 question, with 4 options', (done) => {
    app.get('/api/question')
      .end((err, res) => {
        res.body.question.should.be.a('string');
        res.body.option_1.should.be.a('string');
        res.body.option_2.should.be.a('string');
        res.body.option_3.should.be.a('string');
        res.body.option_4.should.be.a('string');
        res.body.answer.should.be.a('number');
        done();
      });
  });

});
