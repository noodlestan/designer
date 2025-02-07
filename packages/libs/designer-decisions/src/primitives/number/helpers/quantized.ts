export function quantized(num: number, q?: number): number {
    if (!q || q < 0) {
        return num;
    }

    const rounded = Math.round(num / q) * q;

    const decimals = (q.toString().split('.')[1] || '').length;
    return parseFloat(rounded.toFixed(decimals));
}
