const currencyFormatter = (value, locale = 'en-US', currency = 'USD') => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid input: value must be a number');
  }
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return formatter.format(value);
};

const formatCurrencyWithSymbol = (value, currencySymbol = '$', decimalPlaces = 2) => {
  const fixedValue = Number(value).toFixed(decimalPlaces);
  const parts = fixedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currencySymbol}${parts.join('.')}`;
};

export { currencyFormatter, formatCurrencyWithSymbol };