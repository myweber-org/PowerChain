function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = years * 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    return principal * (numerator / denominator);
}