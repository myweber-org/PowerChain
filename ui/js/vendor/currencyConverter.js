const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 300000; // 5 minutes
    }

    async convert(amount, fromCurrency, toCurrency) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }

        const rate = await this.getExchangeRate(fromCurrency, toCurrency);
        const convertedAmount = amount * rate;
        
        return {
            originalAmount: amount,
            fromCurrency: fromCurrency.toUpperCase(),
            toCurrency: toCurrency.toUpperCase(),
            exchangeRate: rate,
            convertedAmount: parseFloat(convertedAmount.toFixed(2))
        };
    }

    async getExchangeRate(fromCurrency, toCurrency) {
        const cacheKey = `${fromCurrency}_${toCurrency}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.rate;
        }

        try {
            const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
            const rates = response.data.rates;
            
            if (!rates[toCurrency]) {
                throw new Error(`Invalid currency code: ${toCurrency}`);
            }

            const rate = rates[toCurrency];
            
            this.cache.set(cacheKey, {
                rate: rate,
                timestamp: Date.now()
            });

            return rate;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Invalid base currency: ${fromCurrency}`);
            }
            throw new Error(`Failed to fetch exchange rates: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
    }

    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.entries()).map(([key, value]) => ({
                pair: key,
                rate: value.rate,
                age: Date.now() - value.timestamp
            }))
        };
    }
}

module.exports = CurrencyConverter;