function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new TypeError('Amount must be a valid number');
    }

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
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

function convertCurrency(amount, fromCurrency, toCurrency, exchangeRates) {
    if (!exchangeRates || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Exchange rates not available for specified currencies');
    }

    const amountInBase = amount / exchangeRates[fromCurrency];
    return amountInBase * exchangeRates[toCurrency];
}

export { formatCurrency, parseCurrency, convertCurrency };