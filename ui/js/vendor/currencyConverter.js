const axios = require('axios');

class CurrencyConverter {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.exchangerate.host';
  }

  async convert(amount, fromCurrency, toCurrency) {
    try {
      const response = await axios.get(`${this.baseUrl}/convert`, {
        params: {
          amount,
          from: fromCurrency,
          to: toCurrency,
          access_key: this.apiKey
        }
      });

      if (response.data.success) {
        return {
          originalAmount: amount,
          fromCurrency: fromCurrency,
          convertedAmount: response.data.result,
          toCurrency: toCurrency,
          rate: response.data.info.rate,
          timestamp: response.data.date
        };
      } else {
        throw new Error(`Conversion failed: ${response.data.error?.info || 'Unknown error'}`);
      }
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  async getSupportedCurrencies() {
    try {
      const response = await axios.get(`${this.baseUrl}/symbols`, {
        params: {
          access_key: this.apiKey
        }
      });

      if (response.data.success) {
        return response.data.symbols;
      } else {
        throw new Error(`Failed to fetch currencies: ${response.data.error?.info || 'Unknown error'}`);
      }
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }

  async getHistoricalRate(date, fromCurrency, toCurrency) {
    try {
      const response = await axios.get(`${this.baseUrl}/${date}`, {
        params: {
          base: fromCurrency,
          symbols: toCurrency,
          access_key: this.apiKey
        }
      });

      if (response.data.success) {
        return {
          date: date,
          fromCurrency: fromCurrency,
          toCurrency: toCurrency,
          rate: response.data.rates[toCurrency]
        };
      } else {
        throw new Error(`Failed to fetch historical rate: ${response.data.error?.info || 'Unknown error'}`);
      }
    } catch (error) {
      throw new Error(`API request failed: ${error.message}`);
    }
  }
}

module.exports = CurrencyConverter;