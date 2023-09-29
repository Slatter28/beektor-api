
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Sensores = mongoose.Schema({
  temperatura: {
    type: String,
    required: true
  },
  humedad: {
    type: String,
    required: true
  },
  colmena: {
    type: Schema.Types.ObjectId,
    ref: 'colmena',
    required: true
  },
});

module.exports = mongoose.model('sensores', Sensores, 'Sensores');
