const calculateSubmit = document.querySelector('form');
interface Calculation {
    loanAmount: number
    expectedSalary: number
    repaymentRate: number
}

let financeCalculation = {
    loanAmount: 0,
    expectedSalary: 0,
    repaymentRate: 0
}

calculateSubmit.addEventListener('submit', beACalculator);

function beACalculator(e) {
    e.preventDefault();
    financeCalculation.loanAmount = document.querySelector('#amountToBorrow').value;
    financeCalculation.repaymentRate = document.querySelector('#rateOfRepay').value;
    financeCalculation.documnet.querySelector('amountToEarn').value;

    console.log(financeCalculation);
}