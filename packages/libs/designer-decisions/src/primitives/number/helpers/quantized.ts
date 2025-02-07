export function quantized(num: number, quantize: number = 0, base: number = 0): number {
    if (!Number.isInteger(base)) {
        throw new Error(`Invalid parameter base. Must be integer, received "${base}"`);
    }

    if (!quantize || quantize < 0) {
        return num;
    }

    const scale = Math.pow(10, base);
    const scaledNum = num * scale;
    const rounded = Math.round(scaledNum / quantize) * quantize;

    const decimals = (quantize.toString().split('.')[1] || '').length + base;
    return parseFloat((rounded / scale).toFixed(Math.max(0, decimals)));
}
