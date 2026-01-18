function calculateMonthlyPayment(principal, annualInterestRate, years) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = years * 12;
    
    if (monthlyInterestRate === 0) {
        return principal / numberOfPayments;
    }
    
    const monthlyPayment = principal * 
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    return Math.round(monthlyPayment * 100) / 100;
}