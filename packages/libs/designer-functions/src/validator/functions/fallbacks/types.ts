export type RecordValidationErrorAttributes = {
    reason: string;
    path?: string;
    schema?: string;
    value?: unknown;
};
