export type DesignerError = {
    name: string;
    error?: unknown;
    message: () => string;
};

export type DesignerErrorParams<T extends DesignerError> = Omit<T, 'name' | 'message'>;
