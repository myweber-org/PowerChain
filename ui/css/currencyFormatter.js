function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    if (typeof value !== 'number') {
        throw new TypeError('Value must be a number');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedString.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    const number = parseFloat(normalized.replace(/[^\d.-]/g, ''));
    return isNaN(number) ? 0 : number;
}

export { formatCurrency, parseCurrency };