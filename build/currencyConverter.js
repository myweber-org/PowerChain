const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    const cached = exchangeRates[cacheKey];
    if (cached && Date.now() - cached.timestamp < 300000) {
        return cached.rate;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        const data = await response.json();
        const rate = data.rates[target];
        exchangeRates[cacheKey] = { rate, timestamp: Date.now() };
        return rate;
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw new Error('Exchange rate fetch failed');
    }
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount < 0) {
        throw new Error('Invalid amount');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Invalid exchange rate');
    }
    return amount * rate;
}

export { fetchExchangeRate, convertCurrency };