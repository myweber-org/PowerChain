function formatCurrency(value, currency = 'USD', locale = 'en-US') {
    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    
    try {
        return new Intl.NumberFormat(locale, options).format(value);
    } catch (error) {
        console.error('Currency formatting error:', error);
        return value.toString();
    }
}

function parseFormattedCurrency(formattedValue, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    const groupSeparator = parts.find(part => part.type === 'group').value;
    
    const cleanedValue = formattedValue
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleanedValue) || 0;
}

export { formatCurrency, parseFormattedCurrency };