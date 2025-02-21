export type TypefaceAxisName = 'wght' | 'italic' | 'ital' | string;

export type TypefaceRangeInput = {
    tag: TypefaceAxisName;
    min: number;
    max: number;
    defaultValue?: number;
};
