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
});