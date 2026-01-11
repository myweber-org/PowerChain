function formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Input must be a valid number');
    }
    
    const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${formatted}`;
}

module.exports = formatCurrency;