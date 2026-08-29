import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suits: formatCurrency')
console.log('convert cents into dollar')
if(formatCurrency(2095)=== '20.95'){
  console.log('passed')
}else{
  console.log("not passed")
}

console.log('work with 2095')