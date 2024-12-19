export const schemaFileName = (schemaId: string): string => {
    return `${schemaId.replaceAll(':', '/')}.json`;
};
