function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new TypeError('Amount must be a valid number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    
    const regex = new RegExp(`[^0-9${decimalSeparator}]`, 'g');
    const numericString = formattedString
        .replace(regex, '')
        .replace(decimalSeparator, '.');
    
    const parsedValue = parseFloat(numericString);
    
    return isNaN(parsedValue) ? 0 : parsedValue;
}

export { formatCurrency, parseCurrency };