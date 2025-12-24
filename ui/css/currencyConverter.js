function fetchExchangeRate(baseCurrency, targetCurrency) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.rates && data.rates[targetCurrency]) {
                return data.rates[targetCurrency];
            } else {
                throw new Error('Target currency not found');
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            return null;
        });
}

function convertCurrency(amount, baseCurrency, targetCurrency) {
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            if (rate) {
                const convertedAmount = amount * rate;
                return {
                    amount: amount,
                    baseCurrency: baseCurrency,
                    targetCurrency: targetCurrency,
                    rate: rate,
                    convertedAmount: convertedAmount,
                    timestamp: new Date().toISOString()
                };
            } else {
                throw new Error('Conversion failed');
            }
        });
}

function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    }).format(amount);
}

const CurrencyConverter = {
    convert: convertCurrency,
    format: formatCurrency
};

export default CurrencyConverter;