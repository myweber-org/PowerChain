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
        .replace(new RegExp(`\\${groupSeparator}`, 'g'), '')
        .replace(new RegExp(`\\${decimalSeparator}`), '.')
        .replace(/[^\d.-]/g, '');
    
    return parseFloat(cleanString);
}

function getCurrencySymbol(currencyCode, locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    return formatter.format(0).replace(/[0\s]/g, '');
}

function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Invalid currency code or missing exchange rate');
    }
    
    const amountInUSD = amount / exchangeRates[fromCurrency];
    return amountInUSD * exchangeRates[toCurrency];
}

export { formatCurrency, parseCurrency, getCurrencySymbol, convertCurrency };