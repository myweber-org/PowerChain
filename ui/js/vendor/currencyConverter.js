const fetch = require('node-fetch');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = {};
        this.cacheDuration = 3600000; // 1 hour
    }

    async convert(amount, fromCurrency, toCurrency) {
        try {
            const rates = await this.getExchangeRates(fromCurrency);
            const rate = rates[toCurrency];
            
            if (!rate) {
                throw new Error(`Exchange rate for ${toCurrency} not available`);
            }
            
            return amount * rate;
        } catch (error) {
            console.error('Conversion error:', error.message);
            throw error;
        }
    }

    async getExchangeRates(baseCurrency) {
        const cacheKey = baseCurrency;
        const now = Date.now();
        
        if (this.cache[cacheKey] && (now - this.cache[cacheKey].timestamp) < this.cacheDuration) {
            return this.cache[cacheKey].rates;
        }
        
        const response = await fetch(`${this.baseUrl}/${baseCurrency}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        this.cache[cacheKey] = {
            rates: data.rates,
            timestamp: now
        };
        
        return data.rates;
    }

    async getAvailableCurrencies() {
        try {
            const rates = await this.getExchangeRates('USD');
            return Object.keys(rates);
        } catch (error) {
            console.error('Failed to get available currencies:', error.message);
            return [];
        }
    }

    clearCache() {
        this.cache = {};
    }
}

module.exports = CurrencyConverter;