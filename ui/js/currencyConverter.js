const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    if (exchangeRates[cacheKey] && (Date.now() - exchangeRates[cacheKey].timestamp) < 300000) {
        return exchangeRates[cacheKey].rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        const rate = data.rates[target];
        
        if (rate) {
            exchangeRates[cacheKey] = {
                rate: rate,
                timestamp: Date.now()
            };
            return rate;
        } else {
            throw new Error(`Exchange rate for ${target} not found`);
        }
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw error;
    }
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    
    return parseFloat((amount * rate).toFixed(2));
}

async function getConversion(baseCurrency, targetCurrency, amount) {
    try {
        const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
        const convertedAmount = convertCurrency(amount, rate);
        
        return {
            originalAmount: amount,
            originalCurrency: baseCurrency,
            convertedAmount: convertedAmount,
            targetCurrency: targetCurrency,
            exchangeRate: rate,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Conversion failed:', error);
        throw error;
    }
}

export { getConversion, fetchExchangeRate, convertCurrency };const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CNY: 6.45
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Invalid currency code');
    }
    
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    
    return parseFloat(convertedAmount.toFixed(2));
}

function getAvailableCurrencies() {
    return Object.keys(exchangeRates);
}

function updateExchangeRate(currency, rate) {
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    exchangeRates[currency] = rate;
}

module.exports = {
    convertCurrency,
    getAvailableCurrencies,
    updateExchangeRate
};