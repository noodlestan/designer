export type ValueAndUnitDefinition = {
    primitiveName: string;
    validUnits: string[];
    defaultUnit?: string;
    base?: number;
    quantize: number;
    fallback: number;
};

export type AbstractValueAndUnit = {
    value: number;
    unit?: string;
};
