const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    const cached = exchangeRates[cacheKey];
    if (cached && Date.now() - cached.timestamp < 3600000) {
        return cached.rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        const rate = data.rates[target];
        exchangeRates[cacheKey] = { rate, timestamp: Date.now() };
        return rate;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw new Error('Exchange rate fetch failed');
    }
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    return amount * rate;
}

export { fetchExchangeRate, convertCurrency };const exchangeRates = {
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

function getSupportedCurrencies() {
    return Object.keys(exchangeRates);
}

function updateExchangeRate(currency, rate) {
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Exchange rate must be a positive number');
    }
    exchangeRates[currency] = rate;
}

module.exports = {
    convertCurrency,
    getSupportedCurrencies,
    updateExchangeRate
};const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    const cacheDuration = 5 * 60 * 1000; // 5 minutes

    if (exchangeRates[cacheKey] && 
        Date.now() - exchangeRates[cacheKey].timestamp < cacheDuration) {
        return exchangeRates[cacheKey].rate;
    }

    try {
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${base}`
        );
        const data = await response.json();
        const rate = data.rates[target];
        
        if (rate) {
            exchangeRates[cacheKey] = {
                rate: rate,
                timestamp: Date.now()
            };
            return rate;
        } else {
            throw new Error(`Target currency ${target} not found`);
        }
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw error;
    }
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount < 0) {
        throw new Error('Amount must be a positive number');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    
    const converted = amount * rate;
    return Math.round(converted * 100) / 100;
}

async function convert(baseCurrency, targetCurrency, amount) {
    const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
    return convertCurrency(amount, rate);
}

function clearCache() {
    Object.keys(exchangeRates).forEach(key => {
        delete exchangeRates[key];
    });
}

export { convert, clearCache, fetchExchangeRate, convertCurrency };