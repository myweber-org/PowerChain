
function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = years * 12;
    
    if (monthlyRate === 0) {
        return principal / totalPayments;
    }
    
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    
    return principal * (numerator / denominator);
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function validateLoanInputs(principal, rate, years) {
    const errors = [];
    
    if (principal <= 0) errors.push('Principal must be positive');
    if (rate < 0) errors.push('Interest rate cannot be negative');
    if (years <= 0) errors.push('Loan term must be positive');
    if (years > 50) errors.push('Loan term cannot exceed 50 years');
    
    return errors;
}