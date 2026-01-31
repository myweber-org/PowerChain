const exchangeRates = {};

async function fetchExchangeRate(fromCurrency, toCurrency) {
    const cacheKey = `${fromCurrency}_${toCurrency}`;
    const cacheDuration = 5 * 60 * 1000; // 5 minutes
    
    if (exchangeRates[cacheKey] && 
        Date.now() - exchangeRates[cacheKey].timestamp < cacheDuration) {
        return exchangeRates[cacheKey].rate;
    }
    
    try {
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        const rate = data.rates[toCurrency];
        
        exchangeRates[cacheKey] = {
            rate: rate,
            timestamp: Date.now()
        };
        
        return rate;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw new Error('Exchange rate service unavailable');
    }
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    return fetchExchangeRate(fromCurrency, toCurrency)
        .then(rate => {
            if (!rate) {
                throw new Error(`Invalid currency pair: ${fromCurrency} to ${toCurrency}`);
            }
            return amount * rate;
        });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

export { convertCurrency, formatCurrency };