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

export { fetchExchangeRate, convertCurrency };