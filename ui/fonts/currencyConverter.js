function currencyConverter(amount, fromCurrency, toCurrency) {
    const exchangeRates = {
        USD: { EUR: 0.85, GBP: 0.73, JPY: 110.15 },
        EUR: { USD: 1.18, GBP: 0.86, JPY: 129.53 },
        GBP: { USD: 1.37, EUR: 1.16, JPY: 150.89 },
        JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066 }
    };

    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        throw new Error('Unsupported currency conversion');
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = amount * rate;
    
    return {
        originalAmount: amount,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        exchangeRate: rate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
    };
}

function formatCurrencyOutput(conversionResult) {
    return `${conversionResult.originalAmount} ${conversionResult.fromCurrency} = ${conversionResult.convertedAmount} ${conversionResult.toCurrency} (Rate: ${conversionResult.exchangeRate})`;
}

module.exports = { currencyConverter, formatCurrencyOutput };