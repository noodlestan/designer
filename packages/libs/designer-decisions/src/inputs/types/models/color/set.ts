import type { AnchoredColorListParams, ColorValueInput } from '../../primitives';
import type { DecisionInput } from '../../primitives/record';

export type ColorSetExplicitInput = DecisionInput & {
    model: 'color-set/explicit';
    params: {
        values: ColorValueInput[];
    };
};

export type ColorSetBoundedInput = DecisionInput & {
    model: 'color-set/bounded';
    params: {
        from: ColorValueInput;
        to: ColorValueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSetAnchoredInput = DecisionInput & {
    model: 'color-set/anchored';
    params: {
        anchor: ColorValueInput;
    } & AnchoredColorListParams;
};
