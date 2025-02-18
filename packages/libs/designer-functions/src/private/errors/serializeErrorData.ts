export function serializeErrorData(data: unknown): string {
    const type = typeof data;
    const str = JSON.stringify(data, undefined, 2) || '';
    const truncated = str.length > 200 ? str.substring(0, 200) + '\n  ... (truncated)' : str;
    return `[${type}] ${truncated}`;
}
