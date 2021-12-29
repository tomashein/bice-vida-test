const formatCurrency = (val, locale, currency) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(val);

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export { formatCurrency, sleep };
