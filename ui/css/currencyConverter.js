function createCurrencyConverter(baseCurrency = 'USD') {
    const exchangeRates = new Map();
    const cacheDuration = 5 * 60 * 1000; // 5 minutes
    
    async function fetchExchangeRate(targetCurrency) {
        if (exchangeRates.has(targetCurrency)) {
            const cached = exchangeRates.get(targetCurrency);
            if (Date.now() - cached.timestamp < cacheDuration) {
                return cached.rate;
            }
        }
        
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
            const data = await response.json();
            const rate = data.rates[targetCurrency];
            
            if (!rate) {
                throw new Error(`Currency ${targetCurrency} not supported`);
            }
            
            exchangeRates.set(targetCurrency, {
                rate: rate,
                timestamp: Date.now()
            });
            
            return rate;
        } catch (error) {
            console.error('Failed to fetch exchange rate:', error);
            throw error;
        }
    }
    
    function validateAmount(amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Amount must be a valid number');
        }
        if (amount < 0) {
            throw new Error('Amount cannot be negative');
        }
        return true;
    }
    
    async function convert(amount, targetCurrency) {
        validateAmount(amount);
        
        if (targetCurrency === baseCurrency) {
            return amount;
        }
        
        const rate = await fetchExchangeRate(targetCurrency);
        return parseFloat((amount * rate).toFixed(2));
    }
    
    function getSupportedCurrencies() {
        return Array.from(exchangeRates.keys());
    }
    
    function clearCache() {
        exchangeRates.clear();
    }
    
    return {
        convert,
        getSupportedCurrencies,
        clearCache,
        setBaseCurrency: (newCurrency) => {
            baseCurrency = newCurrency;
            clearCache();
        }
    };
}

// Example usage
const converter = createCurrencyConverter('USD');
converter.convert(100, 'EUR').then(result => {
    console.log(`100 USD = ${result} EUR`);
});const axios = require('axios');

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
                convertedAmount: parseFloat(convertedAmount.toFixed(2)),
                toCurrency: toCurrency.toUpperCase(),
                rate: parseFloat(rate.toFixed(6)),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            throw new Error(`Conversion failed: ${error.message}`);
        }
    }

    async getExchangeRate(fromCurrency, toCurrency) {
        const cacheKey = `${fromCurrency}_${toCurrency}`;
        const cached = this.cache.get(cacheKey);

        if (cached && (Date.now() - cached.timestamp) < this.cacheDuration) {
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

    async getAvailableCurrencies() {
        try {
            const response = await axios.get(`${this.baseUrl}/USD`);
            return Object.keys(response.data.rates);
        } catch (error) {
            throw new Error(`Failed to fetch available currencies: ${error.message}`);
        }
    }

    clearCache() {
        this.cache.clear();
        return 'Cache cleared successfully';
    }

    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.entries()).map(([key, value]) => ({
                pair: key,
                rate: value.rate,
                age: Date.now() - value.timestamp
            }))
        };
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

class CurrencyConverter {
  constructor() {
    this.cache = new Map();
    this.lastUpdate = null;
  }

  convert(amount, fromCurrency, toCurrency) {
    if (!this.validateInput(amount, fromCurrency, toCurrency)) {
      throw new Error('Invalid input parameters');
    }

    const cacheKey = `${fromCurrency}_${toCurrency}`;
    let rate = this.cache.get(cacheKey);

    if (!rate || this.shouldRefreshCache()) {
      rate = this.fetchExchangeRate(fromCurrency, toCurrency);
      this.cache.set(cacheKey, rate);
      this.lastUpdate = new Date();
    }

    return amount * rate;
  }

  validateInput(amount, fromCurrency, toCurrency) {
    if (typeof amount !== 'number' || amount <= 0) {
      return false;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      return false;
    }

    return true;
  }

  fetchExchangeRate(fromCurrency, toCurrency) {
    const baseRate = exchangeRates[fromCurrency];
    const targetRate = exchangeRates[toCurrency];
    
    if (!baseRate || !targetRate) {
      throw new Error('Unsupported currency');
    }

    return targetRate / baseRate;
  }

  shouldRefreshCache() {
    if (!this.lastUpdate) return true;
    
    const now = new Date();
    const hoursSinceUpdate = (now - this.lastUpdate) / (1000 * 60 * 60);
    return hoursSinceUpdate > 1;
  }

  clearCache() {
    this.cache.clear();
    this.lastUpdate = null;
  }

  getSupportedCurrencies() {
    return Object.keys(exchangeRates);
  }
}

const converter = new CurrencyConverter();

function formatCurrency(amount, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}

export { CurrencyConverter, formatCurrency };