const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25
};

const rateCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

function validateCurrencyCode(currencyCode) {
    return typeof currencyCode === 'string' && 
           currencyCode.length === 3 && 
           exchangeRates.hasOwnProperty(currencyCode.toUpperCase());
}

function getExchangeRate(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cached = rateCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.rate;
    }
    
    if (!validateCurrencyCode(fromCurrency) || !validateCurrencyCode(toCurrency)) {
        throw new Error('Invalid currency code');
    }
    
    const fromRate = exchangeRates[fromCurrency.toUpperCase()];
    const toRate = exchangeRates[toCurrency.toUpperCase()];
    const rate = toRate / fromRate;
    
    rateCache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
    });
    
    return rate;
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    
    const rate = getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;
    
    return {
        originalAmount: amount,
        fromCurrency: fromCurrency.toUpperCase(),
        toCurrency: toCurrency.toUpperCase(),
        exchangeRate: rate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
    };
}

function clearRateCache() {
    rateCache.clear();
}

function getSupportedCurrencies() {
    return Object.keys(exchangeRates).sort();
}

export {
    convertCurrency,
    getExchangeRate,
    clearRateCache,
    getSupportedCurrencies,
    validateCurrencyCode
};