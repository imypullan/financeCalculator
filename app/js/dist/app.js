"use strict";

var calculateSubmit = document.querySelector('form');
var financeCalculation = {
  loanAmount: 0,
  expectedSalary: 0,
  repaymentRate: 0
};
calculateSubmit.addEventListener('submit', beACalculator);

function beACalculator(e) {
  e.preventDefault();
  financeCalculation.loanAmount = document.querySelector('#amountToBorrow').value;
  financeCalculation.repaymentRate = document.querySelector('#');
  console.log(financeCalculation);
}
//# sourceMappingURL=app.js.map
