/* eslint-disable import/prefer-default-export */
const formatCurrency = (val, locale, currency) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(val);

export { formatCurrency };
