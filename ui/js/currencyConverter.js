const axios = require('axios');

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
        throw new Error(`Unsupported currency: ${toCurrency}`);
      }

      this.cache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
      });

      return amount * rate;
    } catch (error) {
      console.error('Conversion failed:', error.message);
      throw new Error(`Failed to convert ${fromCurrency} to ${toCurrency}`);
    }
  }

  async getSupportedCurrencies() {
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

module.exports = CurrencyConverter;