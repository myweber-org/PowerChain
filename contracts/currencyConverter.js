const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 3600000; // 1 hour
    }

    async convert(amount, fromCurrency, toCurrency) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }

        if (fromCurrency === toCurrency) {
            return amount;
        }

        const rate = await this.getExchangeRate(fromCurrency, toCurrency);
        return amount * rate;
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
                throw new Error(`Currency ${toCurrency} not supported`);
            }

            const rate = rates[toCurrency];
            this.cache.set(cacheKey, {
                rate: rate,
                timestamp: Date.now()
            });

            return rate;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new Error(`Currency ${fromCurrency} not supported`);
            }
            throw new Error(`Failed to fetch exchange rates: ${error.message}`);
        }
    }

    async getSupportedCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            throw new Error(`Failed to fetch supported currencies: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
    }

    setCacheDuration(duration) {
        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Cache duration must be a positive number');
        }
        this.cacheDuration = duration;
    }
}

module.exports = CurrencyConverter;