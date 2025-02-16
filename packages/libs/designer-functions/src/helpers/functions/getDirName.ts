export function getDirName(): string {
    if (typeof __dirname !== 'undefined') {
        return __dirname;
    }

    return '.';
}
