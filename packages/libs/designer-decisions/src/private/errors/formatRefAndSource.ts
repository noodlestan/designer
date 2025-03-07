const formatSource = (sourceName: string = '<unknown>', filename?: string): string => {
    return filename ? `${sourceName} (file: "${filename}")}` : sourceName;
};

export const formatRefAndSource = (
    ref: unknown = '<unknown>',
    sourceName?: string,
    filename?: string,
    showRef = true,
    showSource = true,
): string => {
    const parts: string[] = [];
    if (showRef) {
        parts.push(JSON.stringify(ref));
    }
    if (showSource) {
        parts.push(formatSource(sourceName, filename));
    }
    return parts.length ? ` In ${parts.join(' at ')}.` : '';
};
