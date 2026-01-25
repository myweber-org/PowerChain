const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    }

    async convert(amount, fromCurrency, toCurrency) {
        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            const rate = response.data.rates[toCurrency];
            
            if (!rate) {
                throw new Error(`Exchange rate for ${toCurrency} not found`);
            }
            
            const convertedAmount = amount * rate;
            return {
                originalAmount: amount,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                exchangeRate: rate,
                convertedAmount: parseFloat(convertedAmount.toFixed(2))
            };
        } catch (error) {
            console.error('Conversion error:', error.message);
            throw error;
        }
    }

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            console.error('Failed to fetch currencies:', error.message);
            return [];
        }
    }

    async getExchangeRate(fromCurrency, toCurrency) {
        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            return response.data.rates[toCurrency];
        } catch (error) {
            console.error('Failed to fetch exchange rate:', error.message);
            return null;
        }
    }
}

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    const cachedRate = exchangeRates[cacheKey];
    
    if (cachedRate && Date.now() - cachedRate.timestamp < 3600000) {
        return cachedRate.rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        const rate = data.rates[target];
        
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

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    return amount * rate;
}

export { fetchExchangeRate, convertCurrency };const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    }

    async convert(amount, fromCurrency, toCurrency) {
        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            const rates = response.data.rates;
            
            if (!rates[toCurrency]) {
                throw new Error(`Invalid target currency: ${toCurrency}`);
            }
            
            const rate = rates[toCurrency];
            const convertedAmount = amount * rate;
            
            return {
                originalAmount: amount,
                fromCurrency: fromCurrency,
                toCurrency: toCurrency,
                conversionRate: rate,
                convertedAmount: parseFloat(convertedAmount.toFixed(2))
            };
        } catch (error) {
            console.error('Conversion error:', error.message);
            throw error;
        }
    }

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            console.error('Failed to fetch currencies:', error.message);
            return [];
        }
    }
}

module.exports = CurrencyConverter;const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    }

    async convert(amount, fromCurrency, toCurrency) {
        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            const rates = response.data.rates;
            
            if (!rates[toCurrency]) {
                throw new Error(`Invalid target currency: ${toCurrency}`);
            }
            
            const exchangeRate = rates[toCurrency];
            const convertedAmount = amount * exchangeRate;
            
            return {
                originalAmount: amount,
                fromCurrency: fromCurrency,
                convertedAmount: parseFloat(convertedAmount.toFixed(2)),
                toCurrency: toCurrency,
                exchangeRate: exchangeRate,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Conversion error:', error.message);
            throw new Error(`Failed to convert currency: ${error.message}`);
        }
    }

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            console.error('Failed to fetch currencies:', error.message);
            return [];
        }
    }

    async getExchangeRate(fromCurrency, toCurrency) {
        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            const rates = response.data.rates;
            
            if (!rates[toCurrency]) {
                throw new Error(`Invalid target currency: ${toCurrency}`);
            }
            
            return rates[toCurrency];
        } catch (error) {
            console.error('Failed to get exchange rate:', error.message);
            throw error;
        }
    }
}

module.exports = CurrencyConverter;