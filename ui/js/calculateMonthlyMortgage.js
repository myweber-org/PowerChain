function calculateMonthlyMortgage(principal, annualRate, years, paymentsPerYear = 12) {
    const monthlyRate = annualRate / paymentsPerYear / 100;
    const totalPayments = years * paymentsPerYear;
    
    if (monthlyRate === 0) {
        return principal / totalPayments;
    }
    
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalPayments);
    const denominator = Math.pow(1 + monthlyRate, totalPayments) - 1;
    
    return principal * (numerator / denominator);
}

function validateMortgageInputs(principal, annualRate, years, paymentsPerYear) {
    const errors = [];
    
    if (principal <= 0) errors.push('Principal must be positive');
    if (annualRate < 0) errors.push('Annual rate cannot be negative');
    if (years <= 0) errors.push('Loan term must be positive');
    if (paymentsPerYear <= 0) errors.push('Payments per year must be positive');
    if (!Number.isInteger(paymentsPerYear)) errors.push('Payments per year must be integer');
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

function calculateAmortizationSchedule(principal, annualRate, years, paymentsPerYear = 12) {
    const validation = validateMortgageInputs(principal, annualRate, years, paymentsPerYear);
    if (!validation.isValid) {
        throw new Error('Invalid inputs: ' + validation.errors.join(', '));
    }
    
    const payment = calculateMonthlyMortgage(principal, annualRate, years, paymentsPerYear);
    const monthlyRate = annualRate / paymentsPerYear / 100;
    const schedule = [];
    let remainingBalance = principal;
    
    for (let period = 1; period <= years * paymentsPerYear; period++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = payment - interestPayment;
        remainingBalance -= principalPayment;
        
        schedule.push({
            period: period,
            payment: payment,
            principal: principalPayment,
            interest: interestPayment,
            remainingBalance: Math.max(0, remainingBalance)
        });
    }
    
    return schedule;
}