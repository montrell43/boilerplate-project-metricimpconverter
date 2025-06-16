const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
test('convertHandler should correctly read a decimal number input', function () {
    assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('convertHandler should correctly read a fractional input', function () {
    assert.strictEqual(convertHandler.getNum('1/2km'), 0.5);
  });

  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.approximately(convertHandler.getNum('5.4/3lbs'), 1.8, 0.01);
  });

  test('convertHandler should return "invalid number" for double fractions', function () {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('convertHandler should default to 1 when no numerical input is provided', function () {
    assert.strictEqual(convertHandler.getNum('mi'), 1);
  });

  test('convertHandler should correctly read each valid input unit', function () {
    const inputUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    inputUnits.forEach(function (unit) {
      assert.strictEqual(convertHandler.getUnit('32' + unit), unit === 'l' ? 'L' : unit);
    });
  });

  test('convertHandler should return "invalid unit" for unknown units', function () {
    assert.strictEqual(convertHandler.getUnit('32g'), 'invalid unit');
  });

  test('convertHandler should return correct return unit for each input unit', function () {
    const pairs = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
    Object.keys(pairs).forEach(function (unit) {
      assert.strictEqual(convertHandler.getReturnUnit(unit), pairs[unit]);
    });
  });

  test('convertHandler should correctly return the spelled-out string unit', function () {
    const fullNames = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
    Object.keys(fullNames).forEach(function (unit) {
      assert.strictEqual(convertHandler.spellOutUnit(unit), fullNames[unit]);
    });
  });
});