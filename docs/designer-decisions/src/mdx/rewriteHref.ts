function isAbsolute(href: string): boolean {
    return href.startsWith('/') && !href.startsWith('//');
}
export function rewriteHref(href: string): string {
    if (!process.env.ASTRO_BASE_PATH || !isAbsolute(href)) {
        return href;
    }
    return `${process.env.ASTRO_BASE_PATH}${href}`;
}
