const exchangeRates = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.15,
  CAD: 1.25
};

const cacheDuration = 5 * 60 * 1000;
let lastUpdated = Date.now();

function convertCurrency(amount, fromCurrency, toCurrency) {
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    throw new Error('Invalid currency code');
  }

  const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  return amount * rate;
}

function updateExchangeRate(currency, rate) {
  if (typeof rate !== 'number' || rate <= 0) {
    throw new Error('Invalid exchange rate');
  }
  
  exchangeRates[currency] = rate;
  lastUpdated = Date.now();
}

function isCacheValid() {
  return Date.now() - lastUpdated < cacheDuration;
}

function formatCurrency(amount, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}

module.exports = {
  convertCurrency,
  updateExchangeRate,
  isCacheValid,
  formatCurrency
};