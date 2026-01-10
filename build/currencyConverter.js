const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    this.cache = new Map();
    this.cacheDuration = 3600000; // 1 hour in milliseconds
  }

  async convert(amount, fromCurrency, toCurrency) {
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
      return [];
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = CurrencyConverter;