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

module.exports = CurrencyConverter;