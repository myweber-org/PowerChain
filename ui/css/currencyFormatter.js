function formatCurrency(amount, currencyCode = 'USD', locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(amount);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    const cleanString = formattedString
        .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleanString);
}

function validateCurrencyCode(currencyCode) {
    const currencyCodes = new Set([
        'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'
    ]);
    return currencyCodes.has(currencyCode.toUpperCase());
}

export { formatCurrency, parseCurrency, validateCurrencyCode };function formatCurrency(value, locale = 'en-US', currency = 'USD') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedValue, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1111.11);
    const groupSeparator = parts.find(part => part.type === 'group').value;
    const decimalSeparator = parts.find(part => part.type === 'decimal').value;
    
    const regex = new RegExp(`[${groupSeparator}${decimalSeparator}]`, 'g');
    const normalized = formattedValue.replace(regex, match => 
        match === groupSeparator ? '' : '.'
    );
    
    return parseFloat(normalized.replace(/[^\d.-]/g, ''));
}

export { formatCurrency, parseCurrency };