const axios = require('axios');

class CurrencyConverter {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
        this.cache = new Map();
        this.cacheDuration = 3600000; // 1 hour in milliseconds
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

        const response = await axios.get(`${this.baseUrl}/${fromCurrency}`);
        const rates = response.data.rates;
        const rate = rates[toCurrency.toUpperCase()];

        if (!rate) {
            throw new Error(`Invalid currency code: ${toCurrency}`);
        }

        this.cache.set(cacheKey, {
            rate: rate,
            timestamp: Date.now()
        });

        return rate;
    }

    clearCache() {
        this.cache.clear();
    }

    getCacheSize() {
        return this.cache.size;
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
        throw new Error(`Invalid currency code: ${toCurrency}`);
      }

      this.cache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
      });

      return amount * rate;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const fallbackRate = this.getFallbackRate(fromCurrency, toCurrency);
        if (fallbackRate) {
          return amount * fallbackRate;
        }
      }
      throw new Error(`Conversion failed: ${error.message}`);
    }
  }

  getFallbackRate(fromCurrency, toCurrency) {
    const fallbackRates = {
      'USD_EUR': 0.85,
      'EUR_USD': 1.18,
      'USD_GBP': 0.73,
      'GBP_USD': 1.37,
      'USD_JPY': 110.5,
      'JPY_USD': 0.0091
    };

    return fallbackRates[`${fromCurrency}_${toCurrency}`] || 
           fallbackRates[`${toCurrency}_${fromCurrency}`] ? 
           1 / fallbackRates[`${toCurrency}_${fromCurrency}`] : null;
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheSize() {
    return this.cache.size;
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
      const rate = rates[toCurrency.toUpperCase()];

      if (!rate) {
        throw new Error(`Invalid currency code: ${toCurrency}`);
      }

      this.cache.set(cacheKey, {
        rate: rate,
        timestamp: Date.now()
      });

      return rate;
    } catch (error) {
      throw new Error(`Failed to fetch exchange rates: ${error.message}`);
    }
  }

  clearCache() {
    this.cache.clear();
  }

  getCacheSize() {
    return this.cache.size;
  }
}

module.exports = CurrencyConverter;