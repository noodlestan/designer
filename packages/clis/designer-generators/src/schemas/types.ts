export type SourceType = 'primitives' | 'decision-types';

export type SymbolInfo = {
    symbolName: string;
    sourceType: SourceType;
    schemaId: string;
    filePath: string;
    tjsParams: Record<string, unknown>;
};

export type SchemaGeneratorEvent =
    | { type: 'info'; value: string }
    | { type: 'generated'; value: string };

export type SchemaGeneratorEventListener = (event: SchemaGeneratorEvent) => void;

export type SchemaGenerator = {
    discover: () => Promise<void>;
    generate: () => Promise<string[]>;
    on: (event: 'event', callback: SchemaGeneratorEventListener) => void;
};
