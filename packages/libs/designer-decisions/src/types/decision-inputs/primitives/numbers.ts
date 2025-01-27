export type NumberModifierType = 'linear' | 'proportional' | 'geometric';

export type NumberLinearModifier = { mode: 'linear'; by: number };

export type NumberProportionalModifier = { mode: 'proportional'; by: number };

export type NumberGeometricModifier = { mode: 'geometric'; by: number };

export type NumberClamp = [number, number];

export type NumberModifier =
    | NumberLinearModifier
    | NumberProportionalModifier
    | NumberGeometricModifier;

export type AnchoredNumberSeriesParams = {
    before?: {
        steps: number;
        modifier: NumberModifier;
    };
    after?: {
        steps: number;
        modifier: NumberModifier;
    };
};

export type NormalNumber = number;

export type Degrees = number; // between 0 and 360
