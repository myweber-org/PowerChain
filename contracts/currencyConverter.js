const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35
};

function convertCurrency(amount, fromCurrency, toCurrency) {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        throw new Error('Invalid currency code');
    }
    
    const amountInUSD = amount / exchangeRates[fromCurrency];
    const convertedAmount = amountInUSD * exchangeRates[toCurrency];
    
    return parseFloat(convertedAmount.toFixed(2));
}

function formatCurrency(amount, currencyCode) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    });
    
    return formatter.format(amount);
}

function updateExchangeRate(currency, rate) {
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    
    exchangeRates[currency] = rate;
    return true;
}

module.exports = {
    convertCurrency,
    formatCurrency,
    updateExchangeRate,
    getAvailableCurrencies: () => Object.keys(exchangeRates)
};const axios = require('axios');

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
      return response.data.rates[toCurrency];
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error.message);
      return null;
    }
  }
}

module.exports = CurrencyConverter;