export type TypefaceSourceImportInput = {
    type: 'import';
    value: string;
};

export type TypefaceProvider = 'fontsource' | 'google';

export type TypefaceSourceProviderInput = {
    type: 'provider';
    provider: 'fontsource' | 'google';
    id?: string;
};

export type TypefaceSourceInput = TypefaceSourceProviderInput | TypefaceSourceImportInput;
