const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    if (exchangeRates[cacheKey] && (Date.now() - exchangeRates[cacheKey].timestamp) < 300000) {
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
        } else {
            throw new Error(`Exchange rate for ${target} not found`);
        }
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw error;
    }
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    
    return parseFloat((amount * rate).toFixed(2));
}

async function getConversion(baseCurrency, targetCurrency, amount) {
    try {
        const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
        const convertedAmount = convertCurrency(amount, rate);
        
        return {
            originalAmount: amount,
            originalCurrency: baseCurrency,
            convertedAmount: convertedAmount,
            targetCurrency: targetCurrency,
            exchangeRate: rate,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Conversion failed:', error);
        throw error;
    }
}

export { getConversion, fetchExchangeRate, convertCurrency };const exchangeRates = {
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

function getAvailableCurrencies() {
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
    getAvailableCurrencies,
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

  async getAvailableCurrencies() {
    try {
      const response = await axios.get(`${this.baseUrl}/USD`);
      return Object.keys(response.data.rates);
    } catch (error) {
      throw new Error(`Failed to fetch currencies: ${error.message}`);
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