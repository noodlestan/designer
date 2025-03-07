export type DesignerError = {
    layer: string;
    name: string;
    message: (showRef?: boolean, showSource?: boolean) => string;
    docs: () => string;
    error?: unknown;
};

export type DesignerErrorParams<T extends DesignerError> = Omit<
    T,
    'layer' | 'name' | 'message' | 'docs'
>;
