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

module.exports = CurrencyConverter;const exchangeRates = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CNY: 6.45
};

const rateCache = new Map();

class CurrencyConverter {
    constructor(baseCurrency = 'USD') {
        this.baseCurrency = baseCurrency.toUpperCase();
        this.lastUpdated = new Date();
    }

    convert(amount, fromCurrency, toCurrency) {
        const from = fromCurrency.toUpperCase();
        const to = toCurrency.toUpperCase();
        
        if (!exchangeRates[from] || !exchangeRates[to]) {
            throw new Error('Unsupported currency');
        }

        const cacheKey = `${from}_${to}`;
        let rate;

        if (rateCache.has(cacheKey)) {
            const cached = rateCache.get(cacheKey);
            if (Date.now() - cached.timestamp < 3600000) {
                rate = cached.rate;
            }
        }

        if (!rate) {
            rate = exchangeRates[to] / exchangeRates[from];
            rateCache.set(cacheKey, {
                rate: rate,
                timestamp: Date.now()
            });
        }

        return amount * rate;
    }

    addCustomRate(currency, rate) {
        const normalizedCurrency = currency.toUpperCase();
        exchangeRates[normalizedCurrency] = rate;
        rateCache.clear();
        this.lastUpdated = new Date();
    }

    getSupportedCurrencies() {
        return Object.keys(exchangeRates);
    }

    formatCurrency(amount, currency) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase()
        });
        return formatter.format(amount);
    }
}

const converter = new CurrencyConverter();

function convertAndDisplay(amount, from, to) {
    try {
        const result = converter.convert(amount, from, to);
        const formatted = converter.formatCurrency(result, to);
        console.log(`${amount} ${from} = ${formatted}`);
        return result;
    } catch (error) {
        console.error('Conversion error:', error.message);
        return null;
    }
}

export { CurrencyConverter, convertAndDisplay };