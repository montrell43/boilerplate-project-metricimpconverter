'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  // Handle errors
  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.send('invalid number and unit');
  }
  if (initNum === 'invalid number') {
    return res.send('invalid number');
  }
  if (initUnit === 'invalid unit') {
    return res.send('invalid unit');
  }

  // Perform conversion
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const returnNum = convertHandler.convert(initNum, initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  // Send JSON response
  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string
  });
});

};
