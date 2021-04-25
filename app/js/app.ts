const calculateSubmit = document.querySelector('form');
interface Calculation {
    loanAmount: number
    expectedSalary: number
    repaymentRate: number
    maxLoanSize: number
    adminFee: number
    monthsToRepay: number
}
let financing = {
    loanAmount: 0,
    expectedSalary: 0,
    repaymentRate: 0,
    maxLoanSize: 10000,
    adminFee: 0,
    monthsToRepay: 0
}
calculateSubmit.addEventListener('submit', calculateLoanItems);
function calculateLoanItems(e) {
    e.preventDefault();
    financing.monthsToRepay = 0;
    financing.loanAmount = Number(document.querySelector<HTMLInputElement>('#amountToBorrow').value);
    financing.repaymentRate = Number(document.querySelector<HTMLInputElement>('#repaymentRate').value);
    financing.expectedSalary = Number(document.querySelector<HTMLInputElement>('#expectedSalary').value);
    let loanSizeInRange = checkLoanSize(financing);
    let repaymentRateInRange = checkRepaymentRate(financing);
    if (loanSizeInRange && repaymentRateInRange) {
        addAdminFee(financing);
        calculateUpfrontAdmin(financing);
        calculateMonthsToPay(financing);
        displayResults(financing);
    }
}
function checkLoanSize(financing: Calculation):boolean {
    let loanInput = document.querySelector<HTMLInputElement>('#amountToBorrow');
    let errorModal = document.querySelector('#modal1');
    if(financing.loanAmount > 0 && financing.loanAmount <= financing.maxLoanSize) {
        loanInput.classList.remove('error');
        errorModal.classList.add('errorModal');
        return true;
    }
    loanInput.classList.add('error');
    errorModal.classList.remove('errorModal');
    return false;
}
function checkRepaymentRate(financing: Calculation):boolean {
    let repaymentRateInput = document.querySelector<HTMLInputElement>('#repaymentRate');
    let errorModal = document.querySelector('#modal2');
    if(financing.repaymentRate >= 10 && financing.repaymentRate <= 100) {
        repaymentRateInput.classList.remove('error');
        errorModal.classList.add('errorModal');
        return true;
    }
    repaymentRateInput.classList.add('error');
    errorModal.classList.remove('errorModal');
    return false;
}
function addAdminFee(financing: Calculation):number {
    if (financing.loanAmount > (financing.maxLoanSize * 0.9)) {
        return financing.loanAmount += 1000;
    } else if (financing.loanAmount > (financing.maxLoanSize * 0.8)) {
        return financing.loanAmount += 500;
    }
    return financing.loanAmount;
}
function calculateUpfrontAdmin(financing: Calculation):number {
    financing.adminFee = Number((financing.loanAmount * 0.05).toFixed(2));
    return financing.adminFee;
}
function calculateMonthsToPay(financing: Calculation):number {
    let loanAmount = financing.loanAmount;
    let monthlySalary = financing.expectedSalary/12;
    let monthlyRepayment = (monthlySalary * (financing.repaymentRate/100)).toFixed(2);
    while (loanAmount > 0) {
        //@ts-ignore
        loanAmount -= monthlyRepayment;
        financing.monthsToRepay++;
    }
   return financing.monthsToRepay;
}
async function displayResults(financing: Calculation):Promise<void> {
    let response = await fetch('template.hbs');
    let source = await response.text();
    //@ts-ignore
    let template = Handlebars.compile(source);
    //@ts-ignore
    const html = template(financing);
    document.querySelector('.showResults').innerHTML = html;
}