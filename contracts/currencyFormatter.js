function formatCurrency(value, currencySymbol = '$', decimalPlaces = 2) {
    if (typeof value !== 'number' || isNaN(value)) {
        throw new Error('Invalid input: value must be a number');
    }
    
    const fixedValue = value.toFixed(decimalPlaces);
    const parts = fixedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return currencySymbol + parts.join('.');
}