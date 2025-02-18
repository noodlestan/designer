export function maybeErrorMessage(error: unknown, template: string = '{}'): string {
    if (!error) {
        return '';
    }
    const str = error instanceof Error ? error.message || error.name : '';
    return template.replace('{}', str);
}
