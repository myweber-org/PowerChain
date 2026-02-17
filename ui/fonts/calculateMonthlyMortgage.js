function calculateMonthlyMortgage(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }
    
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    
    return principal * (numerator / denominator);
}

function validateMortgageInput(principal, annualRate, years) {
    const errors = [];
    
    if (principal <= 0) {
        errors.push('Principal must be greater than zero');
    }
    
    if (annualRate < 0) {
        errors.push('Annual rate cannot be negative');
    }
    
    if (years <= 0) {
        errors.push('Loan term must be greater than zero years');
    }
    
    if (years > 50) {
        errors.push('Loan term cannot exceed 50 years');
    }
    
    return errors;
}

function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}