function formatCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Input must be a valid number');
    }
    
    const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${formatted}`;
}

module.exports = formatCurrency;function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const pattern = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
    const cleaned = formattedString.replace(pattern, '')
                                   .replace(decimalSeparator, '.');
    
    return parseFloat(cleaned) || 0;
}

export { formatCurrency, parseCurrency };