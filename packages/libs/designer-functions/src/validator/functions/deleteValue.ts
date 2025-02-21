export function deleteValue(data: Record<string, unknown>, path: string): void {
    path = path.replace(/^\//, '');

    const keys = path.split('/');
    const lastKey = keys.pop();
    if (!lastKey) return;

    const parent = keys.reduce((acc, key) => {
        if (acc === undefined || acc === null) return undefined;
        if (!isNaN(Number(key)) && Array.isArray(acc)) {
            return acc[Number(key)];
        }
        return acc[key];
    }, data);

    if (parent === undefined || parent === null) return;

    if (Array.isArray(parent) && !isNaN(Number(lastKey))) {
        parent.splice(Number(lastKey), 1);
    } else {
        delete parent[lastKey];
    }
}
