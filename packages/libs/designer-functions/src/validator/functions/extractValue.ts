export function extractValue(data: Record<string, unknown>, path: string): unknown {
    path = path.replace(/^\//, '');

    return path.split('/').reduce((acc, key) => {
        if (acc === undefined || acc === null) return undefined;

        if (!isNaN(Number(key)) && Array.isArray(acc)) {
            return acc[Number(key)];
        }

        return acc[key];
    }, data);
}
