export type NumberModifierType = 'linear' | 'proportional' | 'geometric';

export type NumberModifierLinearInput = { mode: 'linear'; by: number };

export type NumberModifierProportionalInput = { mode: 'proportional'; by: number };

export type NumberModifierGeometricInput = { mode: 'geometric'; by: number };

export type NumberModifierInput =
    | NumberModifierLinearInput
    | NumberModifierProportionalInput
    | NumberModifierGeometricInput;

export type PercentageInput = number;

export type DegreesInput = number;
