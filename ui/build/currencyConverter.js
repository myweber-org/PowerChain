function fetchExchangeRate(baseCurrency, targetCurrency) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const url = `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.rates || !data.rates[targetCurrency]) {
                throw new Error(`Exchange rate for ${targetCurrency} not found`);
            }
            return data.rates[targetCurrency];
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            return null;
        });
}

function convertCurrency(amount, baseCurrency, targetCurrency) {
    return fetchExchangeRate(baseCurrency, targetCurrency)
        .then(rate => {
            if (rate === null) {
                return null;
            }
            const convertedAmount = amount * rate;
            return {
                amount: amount,
                baseCurrency: baseCurrency,
                targetCurrency: targetCurrency,
                rate: rate,
                convertedAmount: convertedAmount,
                timestamp: new Date().toISOString()
            };
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

const CurrencyConverter = {
    convert: convertCurrency,
    format: formatCurrency,
    
    async convertAndDisplay(amount, from, to, elementId) {
        const result = await this.convert(amount, from, to);
        if (result && elementId) {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `
                    ${this.format(amount, from)} = 
                    ${this.format(result.convertedAmount, to)}
                    <br><small>Rate: 1 ${from} = ${result.rate.toFixed(4)} ${to}</small>
                `;
            }
        }
        return result;
    }
};

export default CurrencyConverter;