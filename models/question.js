const mongoose = require('mongoose');

const quizySchema = new mongoose.Schema({
  question: { type: String, required: true },//,
  option_1: { type: String, required: true },//,
  option_2: { type: String, required: true },//,
  option_3: { type: String, required: true },//,
  option_4: { type: String, required: true },
  answer: { type: Number, required: true }//,
  // category: { type: String, required: true },
  // location: {
  //   name: { type: String, required: true },
  //   lat: { type: String, required: true },
  //   lon: { type: String, required: true }
  // },
  // loc: {
  //   type: [Number],  // [<longitude>, <latitude>]
  //   index: '2d'      // create the geospatial index
  // },
  // website: { type: String, required: false },
  // details: { type: String, required: false },
  // image: { type: String, required: true },
  // startTime: { type: Date, required: true }, //Start time, date set to /01/02/2003
  // finishTime: { type: Date, required: true }, //new Date(17, 7, 9, 8, 0, 0, 0),
  // date: { type: Date, required: true } // new Date(17, 7, 9, 17, 0, 0, 0)
});

module.exports = mongoose.model('Question', quizySchema);
