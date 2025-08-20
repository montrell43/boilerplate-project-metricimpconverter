const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  test('Whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });
  
  test('Decimal Input', function() {
    assert.equal(convertHandler.getNum('32.5L'), 32.5);
  });
  
  test('Fractional Input', function() {
    assert.equal(convertHandler.getNum('1/2L'), 0.5);
  });
  
  test('Fractional Input w/ Decimal', function() {
    assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
  });
  
  test('Invalid Input (double fraction)', function() {
    assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
  });
  
  test('No Numerical Input', function() {
    assert.equal(convertHandler.getNum('L'), 1);
  });

  test('Valid Input Unit', function() {
    assert.equal(convertHandler.getUnit('32L'), 'L');
  });

  test('Invalid Input Unit', function() {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('Return Unit for each valid input unit', function() {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
    units.forEach((u, i) => {
      assert.equal(convertHandler.getReturnUnit(u), expected[i]);
    });
  });

  test('Spell out each unit', function() {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const expected = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    units.forEach((u, i) => {
      assert.equal(convertHandler.spellOutUnit(u), expected[i]);
    });
  });

  test('gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  test('L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  test('km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
  });

  test('kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });

});
//this code passes