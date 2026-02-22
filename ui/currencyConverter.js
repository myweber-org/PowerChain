const exchangeRates = {
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
        throw new Error('Invalid exchange rate');
    }
    exchangeRates[currency] = rate;
}

module.exports = {
    convertCurrency,
    getSupportedCurrencies,
    updateExchangeRate
};const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 300000; // 5 minutes
    }

    async convert(amount, fromCurrency, toCurrency) {
        if (fromCurrency === toCurrency) {
            return amount;
        }

        const cacheKey = `${fromCurrency}_${toCurrency}`;
        const cached = this.cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return amount * cached.rate;
        }

        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            const rates = response.data.rates;
            const rate = rates[toCurrency];

            if (!rate) {
                throw new Error(`Currency ${toCurrency} not found`);
            }

            this.cache.set(cacheKey, {
                rate: rate,
                timestamp: Date.now()
            });

            return amount * rate;
        } catch (error) {
            console.error('Conversion error:', error.message);
            throw new Error('Failed to fetch exchange rates');
        }
    }

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            console.error('Failed to fetch currencies:', error.message);
            return ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
        }
    }

    clearCache() {
        this.cache.clear();
    }

    setCacheDuration(duration) {
        this.cacheDuration = duration;
    }
}

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cacheTime = 24 * 60 * 60 * 1000; // 24 hours
    
    if (exchangeRates[cacheKey] && 
        Date.now() - exchangeRates[cacheKey].timestamp < cacheTime) {
        return exchangeRates[cacheKey].rate;
    }
    
    try {
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        exchangeRates[cacheKey] = {
            rate: rate,
            timestamp: Date.now()
        };
        
        return rate;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw new Error('Exchange rate service unavailable');
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    return fetchExchangeRate(fromCurrency, toCurrency)
        .then(rate => {
            if (!rate) {
                throw new Error(`No exchange rate found for ${fromCurrency} to ${toCurrency}`);
            }
            return amount * rate;
        });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

export { convertCurrency, formatCurrency };