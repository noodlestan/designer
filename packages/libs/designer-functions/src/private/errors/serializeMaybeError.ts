export function serializeMaybeError(error: unknown, template: string = '{}'): string {
    if (!error) {
        return '';
    }
    const str = error instanceof Error ? error.stack || error.name : JSON.stringify(error);
    return template.replace('{}', str);
}
