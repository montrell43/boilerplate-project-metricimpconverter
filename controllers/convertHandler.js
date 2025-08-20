function ConvertHandler() {
  
  this.getNum = function(input) {
const trimmedInput = input.trim();

     const result = input.match(/^[^a-zA-Z]+/); // Get everything before letters

  if (!result) return 1; // No number part = default to 1

  const numStr = result[0];

  if ((numStr.match(/\//g) || []).length > 1) {
    return 'invalid number';
  }

  try {
    return eval(numStr);
  } catch (e) {
    return 'invalid number';
  }
  };
  
  this.getUnit = function(input) {
    const unitRegex = /[a-zA-z]+$/;
    const match = input.match(unitRegex);

    if(!match) return 'invalid unit';

    const unit = match[0].toLowerCase();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    return validUnits.includes(unit) ? (unit === 'l' ? 'L' : unit) : 'invalid unit';
  };
  
  this.getReturnUnit = function(initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      lbs: 'kg',
      kg: 'lbs',
      mi: 'km',
      km: 'mi'
    };
    
    return map[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const map = {
      gal: 'gallons',
    L: 'liters',
    lbs: 'pounds',
    kg: 'kilograms',
    mi: 'miles',
    km: 'kilometers'
    };
    
    return map[unit];
  };
  
  this.convert = function(initNum, initUnit) {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  let result;

  switch (initUnit) {
    case 'gal':
      result = initNum * galToL;
      break;
    case 'L':
      result = initNum / galToL;
      break;
    case 'lbs':
      result = initNum * lbsToKg;
      break;
    case 'kg':
      result = initNum / lbsToKg;
      break;
    case 'mi':
      result = initNum * miToKm;
      break;
    case 'km':
      result = initNum / miToKm;
      break;
    default:
      return 'invalid unit';
  }

  // Round to 5 decimal places
  return Math.round(result * 100000) / 100000;
};

  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
     const initUnitFull = this.spellOutUnit(initUnit);
  const returnUnitFull = this.spellOutUnit(returnUnit);
  return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  
}
}

module.exports = ConvertHandler;
