const exchangeRates = {};

async function fetchExchangeRate(base, target) {
    const cacheKey = `${base}_${target}`;
    if (exchangeRates[cacheKey] && (Date.now() - exchangeRates[cacheKey].timestamp) < 300000) {
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
        } else {
            throw new Error(`Exchange rate for ${target} not found`);
        }
    } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        throw error;
    }
}

function convertCurrency(amount, rate) {
    if (typeof amount !== 'number' || amount <= 0) {
        throw new Error('Amount must be a positive number');
    }
    if (typeof rate !== 'number' || rate <= 0) {
        throw new Error('Rate must be a positive number');
    }
    
    return parseFloat((amount * rate).toFixed(2));
}

async function getConversion(baseCurrency, targetCurrency, amount) {
    try {
        const rate = await fetchExchangeRate(baseCurrency, targetCurrency);
        const convertedAmount = convertCurrency(amount, rate);
        
        return {
            originalAmount: amount,
            originalCurrency: baseCurrency,
            convertedAmount: convertedAmount,
            targetCurrency: targetCurrency,
            exchangeRate: rate,
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error('Conversion failed:', error);
        throw error;
    }
}

export { getConversion, fetchExchangeRate, convertCurrency };