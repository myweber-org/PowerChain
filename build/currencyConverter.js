const fetch = require('node-fetch');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const response = await fetch(`${this.baseUrl}/${fromCurrency}`);
      const data = await response.json();
      
      if (!data.rates || !data.rates[toCurrency]) {
        throw new Error('Invalid currency code');
      }
      
      const rate = data.rates[toCurrency];
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
      const response = await fetch(`${this.baseUrl}/USD`);
      const data = await response.json();
      return Object.keys(data.rates);
    } catch (error) {
      console.error('Failed to fetch currencies:', error.message);
      return [];
    }
  }
}

module.exports = CurrencyConverter;