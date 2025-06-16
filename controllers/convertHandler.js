function ConvertHandler() {
  
  this.getNum = function(input) {
    const numRegex = /^[^a-zA-Z]*/

    const match = input.match(numRegex)[0]

    if(match === "") return 1;

    if ((match.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }

    try {
      return eval(match);
    } catch {
      return 'invalid number'
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

  switch (initUnit) {
    case 'gal': return parseFloat((initNum * galToL).toFixed(5));
    case 'L': return parseFloat((initNum / galToL).toFixed(5));
    case 'lbs': return parseFloat((initNum * lbsToKg).toFixed(5));
    case 'kg': return parseFloat((initNum / lbsToKg).toFixed(5));
    case 'mi': return parseFloat((initNum * miToKm).toFixed(5));
    case 'km': return parseFloat((initNum / miToKm).toFixed(5));
    default: return 'invalid unit';
  }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
     const initUnitFull = this.spellOutUnit(initUnit);
  const returnUnitFull = this.spellOutUnit(returnUnit);
  return `${initNum} ${initUnitFull} converts to ${returnNum} ${returnUnitFull}`;
  
}
}

module.exports = ConvertHandler;
