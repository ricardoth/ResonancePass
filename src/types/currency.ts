export const formatCurrency = (amount: any, currency: any = 'USD') => {
    let locale;

    switch (currency) {
        case 'USD':
            locale = 'en-US';
            break;
        case 'EUR':
            locale = 'de-DE';
            break;
        case 'JPY':
            locale = 'ja-JP';
            break;
        case 'CLP':
            locale = 'es-CL';
            break;
        default:
            locale = 'en-US';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: (currency === 'JPY' || currency === 'CLP') ? 0 : 2, 
    }).format(amount);
}