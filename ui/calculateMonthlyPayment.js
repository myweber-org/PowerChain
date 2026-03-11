function calculateMonthlyPayment(principal, annualInterestRate, years) {
    const monthlyRate = annualInterestRate / 12 / 100;
    const totalPayments = years * 12;
    if (monthlyRate === 0) {
        return principal / totalPayments;
    }
    const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(monthlyPayment * 100) / 100;
}