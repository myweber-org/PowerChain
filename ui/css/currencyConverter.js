const axios = require('axios');

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
        toCurrency: toCurrency,
        exchangeRate: exchangeRate,
        convertedAmount: parseFloat(convertedAmount.toFixed(2))
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

  formatCurrency(amount, currencyCode) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode
    });
    return formatter.format(amount);
  }
}

module.exports = CurrencyConverter;const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    if (exchangeRates[cacheKey] && (Date.now() - exchangeRates[cacheKey].timestamp) < 3600000) {
        return exchangeRates[cacheKey].rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        const rate = data.rates[target];
        
        if (rate) {
            exchangeRates[cacheKey] = {
                rate: rate,
                timestamp: Date.now()
            };
            return rate;
        }
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
    }
    
    return null;
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new Error('Amount must be a valid number');
    }
    if (typeof rate !== 'number' || isNaN(rate)) {
        throw new Error('Rate must be a valid number');
    }
    
    return parseFloat((amount * rate).toFixed(2));
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
      console.error('Failed to fetch exchange rate:', error.message);
      throw error;
    }
  }
}

module.exports = CurrencyConverter;const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CNY: 6.45
};

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

function validateCurrencyCode(code) {
    return typeof code === 'string' && 
           code.length === 3 && 
           exchangeRates.hasOwnProperty(code.toUpperCase());
}

function getCachedRate(from, to) {
    const key = `${from}_${to}`;
    const cached = cache.get(key);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return cached.rate;
    }
    return null;
}

function setCachedRate(from, to, rate) {
    const key = `${from}_${to}`;
    cache.set(key, {
        rate: rate,
        timestamp: Date.now()
    });
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    
    const from = fromCurrency.toUpperCase();
    const to = toCurrency.toUpperCase();
    
    if (!validateCurrencyCode(from) || !validateCurrencyCode(to)) {
        throw new Error('Invalid currency code');
    }
    
    let rate = getCachedRate(from, to);
    
    if (!rate) {
        rate = exchangeRates[to] / exchangeRates[from];
        setCachedRate(from, to, rate);
    }
    
    const result = amount * rate;
    
    return {
        originalAmount: amount,
        fromCurrency: from,
        toCurrency: to,
        convertedAmount: parseFloat(result.toFixed(2)),
        exchangeRate: parseFloat(rate.toFixed(6)),
        timestamp: new Date().toISOString()
    };
}

function formatCurrencyOutput(conversionResult) {
    return `${conversionResult.originalAmount} ${conversionResult.fromCurrency} = ${conversionResult.convertedAmount} ${conversionResult.toCurrency}`;
}

function getAvailableCurrencies() {
    return Object.keys(exchangeRates).sort();
}

export {
    convertCurrency,
    formatCurrencyOutput,
    getAvailableCurrencies,
    validateCurrencyCode
};