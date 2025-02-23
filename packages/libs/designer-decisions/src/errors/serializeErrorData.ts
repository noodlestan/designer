export function serializeErrorData(data: unknown, spaces: number = 2): string {
    const type = typeof data;
    const str = JSON.stringify(data, undefined, spaces) || '';
    const truncated = str.length > 200 ? str.substring(0, 200) + '\n  ... (truncated)' : str;
    return `[${type}] ${truncated}`;
}
