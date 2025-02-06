export function nearest(num: number, base?: number): number {
    if (!base || base < 0) {
        return num;
    }

    const rounded = Math.round(num / base) * base;

    const decimals = (base.toString().split('.')[1] || '').length;
    return parseFloat(rounded.toFixed(decimals));
}
