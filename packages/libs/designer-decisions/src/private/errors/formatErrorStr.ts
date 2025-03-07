export const formatSource = (sourceName: string = '<unknown>', filename?: string): string => {
    return filename ? `${sourceName} (file: "${filename}")}` : sourceName;
};

export const formatErrorStr = (error?: string | Error): string => {
    if (!error) {
        return '';
    }
    if (error instanceof Error) {
        return ` ${error.message}.`;
    }
    return ` ${error}.`;
};
