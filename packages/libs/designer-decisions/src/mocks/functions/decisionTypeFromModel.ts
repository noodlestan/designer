export const decisionTypeFromModel = (model: string): string => {
    const parts = typeof model === 'string' ? model.split('/') : [];

    if (parts.length !== 2 || typeof parts[0] !== 'string') {
        return 'unknown';
    }
    return parts[0];
};
