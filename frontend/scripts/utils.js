export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

export function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(amount);
}

export async function handleFetchResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'A network error has occurred');
    }
    return response.json();
}