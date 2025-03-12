import type { AnchoredColorListParams, ColorInput, DecisionInput } from '../../primitives';

export type ColorSetExplicitInput = DecisionInput & {
    model: 'color-set/explicit';
    params: {
        values: ColorInput[];
        quantize?: number;
    };
};

export type ColorSetBoundedInput = DecisionInput & {
    model: 'color-set/bounded';
    params: {
        from: ColorInput;
        to: ColorInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSetAnchoredInput = DecisionInput & {
    model: 'color-set/anchored';
    params: {
        anchor: ColorInput;
    } & AnchoredColorListParams;
};
