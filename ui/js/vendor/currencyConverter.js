const exchangeRates = {};

async function fetchExchangeRate(baseCurrency, targetCurrency) {
    const cacheKey = `${baseCurrency}_${targetCurrency}`;
    const cacheDuration = 3600000; // 1 hour in milliseconds
    
    if (exchangeRates[cacheKey] && 
        Date.now() - exchangeRates[cacheKey].timestamp < cacheDuration) {
        return exchangeRates[cacheKey].rate;
    }

    try {
        const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        const data = await response.json();
        const rate = data.rates[targetCurrency];
        
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

function convertCurrency(amount, baseCurrency, targetCurrency) {
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            if (typeof rate !== 'number' || rate <= 0) {
                throw new Error('Invalid exchange rate received');
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