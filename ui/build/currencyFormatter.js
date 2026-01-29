function formatCurrency(value, currency = 'USD', locale = 'en-US') {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Invalid value provided. Must be a number.');
    }
    
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    return formatter.format(value);
}

function parseCurrency(formattedString, locale = 'en-US') {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234.56);
    const decimalSeparator = parts.find(part => part.type === 'decimal')?.value || '.';
    const groupSeparator = parts.find(part => part.type === 'group')?.value || ',';
    
    let cleaned = formattedString
        .replace(new RegExp(`[${groupSeparator}]`, 'g'), '')
        .replace(new RegExp(`[${decimalSeparator}]`, 'g'), '.')
        .replace(/[^\d.-]/g, '');
    
    const number = parseFloat(cleaned);
    return isNaN(number) ? null : number;
}

function getCurrencySymbol(currency = 'USD', locale = 'en-US') {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find(part => part.type === 'currency');
    return symbolPart ? symbolPart.value : currency.toUpperCase();
}

function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
    if (!exchangeRates || typeof exchangeRates !== 'object') {
        throw new Error('Exchange rates object is required');
    }
    
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Unsupported currency in exchange rates');
    }
    
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    if (fromRate <= 0 || toRate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    
    const amountInBase = amount / fromRate;
    return amountInBase * toRate;
}

export { formatCurrency, parseCurrency, getCurrencySymbol, convertCurrency };