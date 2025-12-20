const axios = require('axios');

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
}

module.exports = CurrencyConverter;