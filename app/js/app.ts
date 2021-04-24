const calculateSubmit = document.querySelector('form');
interface Calculation {
    loanAmount: number
    expectedSalary: number
    repaymentRate: number
    maxLoanSize: number
    adminFee: number
    yearsToRepay: number
}
let financing = {
    loanAmount: 0,
    expectedSalary: 0,
    repaymentRate: 0,
    maxLoanSize: 10000,
    adminFee: 400,
    yearsToRepay: 0
}
calculateSubmit.addEventListener('submit', calculateLoanItems);
function calculateLoanItems(e) {
    e.preventDefault();
    financing.loanAmount = Number(document.querySelector<HTMLInputElement>('#amountToBorrow').value);
    financing.repaymentRate = Number(document.querySelector<HTMLInputElement>('#repaymentRate').value);
    financing.expectedSalary = Number(document.querySelector<HTMLInputElement>('#expectedSalary').value);
    let loanSizeInRange = checkLoanSize(financing);
    let repaymentRateInRange = checkRepaymentRate(financing);
    if (loanSizeInRange && repaymentRateInRange) {
        calculateAdminFee(financing);
        displayResults(financing);
    }
    console.log(financing);
}
function checkLoanSize(financing: Calculation):boolean {
    let loanInput = document.querySelector<HTMLInputElement>('#amountToBorrow');
    if(financing.loanAmount > 0 && financing.loanAmount <= financing.maxLoanSize) {
        loanInput.classList.remove('error');
        return true;
    }
    loanInput.classList.add('error');
    return false;
}
function calculateAdminFee(financing: Calculation):number {
    if (financing.loanAmount > (financing.maxLoanSize * 0.9)) {
        return financing.loanAmount += 1000;
    } else if (financing.loanAmount > (financing.maxLoanSize * 0.8)) {
        return financing.loanAmount += 500;
    }
    return financing.loanAmount;
}
function checkRepaymentRate(financing: Calculation):boolean {
    let repaymentRateInput = document.querySelector<HTMLInputElement>('#repaymentRate');
    if(financing.repaymentRate >= 10 && financing.repaymentRate <= 100) {
        repaymentRateInput.classList.remove('error');
        return true;
    }
    repaymentRateInput.classList.add('error');
    return false;
}
async function displayResults(financing: Calculation) {
    let response = await fetch('template.hbs');
    let source = await response.text();
    //@ts-ignore
    template = Handlebars.compile(source);
    //@ts-ignore
    const html = template(financing);
    document.querySelector('.showResults').innerHTML = html;
}

