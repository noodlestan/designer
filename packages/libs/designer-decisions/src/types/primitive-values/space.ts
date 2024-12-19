export type SpaceValue = {
    getValue(): { value: number; units: string };
    getValueString(): string;
};

export type SpaceClampedValue = {
    getValueAtViewportWidth(vw: number): { value: number; units: string };
    getValueString(): string;
};
