function calculateMonthlyPayment(principal, annualInterestRate, years) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    const monthlyPayment = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    return monthlyPayment;
}