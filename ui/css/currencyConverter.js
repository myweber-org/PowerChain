const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
    this.cache = new Map();
    this.cacheDuration = 300000; // 5 minutes
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const rate = await this.getExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = amount * rate;
      return {
        originalAmount: amount,
        fromCurrency: fromCurrency.toUpperCase(),
        toCurrency: toCurrency.toUpperCase(),
        exchangeRate: rate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
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
      
      if (!rates[toCurrency.toUpperCase()]) {
        throw new Error(`Unsupported currency: ${toCurrency}`);
      }

      const rate = rates[toCurrency.toUpperCase()];
      
      this.cache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
      });

      return rate;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error(`Unsupported base currency: ${fromCurrency}`);
      }
      throw error;
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

module.exports = CurrencyConverter;const axios = require('axios');

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

    const rates = await this.getExchangeRates(fromCurrency);
    const rate = rates[toCurrency];

    if (!rate) {
      throw new Error(`Unsupported currency: ${toCurrency}`);
    }

    return amount * rate;
  }

  async getExchangeRates(baseCurrency) {
    const cacheKey = baseCurrency;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.rates;
    }

    try {
      const response = await axios.get(`${this.baseUrl}/${baseCurrency}`);
      const rates = response.data.rates;
      
      this.cache.set(cacheKey, {
        rates: rates,
        timestamp: Date.now()
      });

      return rates;
    } catch (error) {
      throw new Error(`Failed to fetch exchange rates: ${error.message}`);
    }
  }

  clearCache() {
    this.cache.clear();
  }

  getSupportedCurrencies() {
    return ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];
  }
}

module.exports = CurrencyConverter;