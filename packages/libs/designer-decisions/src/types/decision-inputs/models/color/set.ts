import type { AnchoredColorListParams, ColorValueInput } from '../../primitives';
import type { InputRecord } from '../base';

export type ColorSetExplicitInput = InputRecord & {
    model: 'color-set/explicit';
    params: {
        values: ColorValueInput[];
    };
};

export type ColorSetBoundedInput = InputRecord & {
    model: 'color-set/bounded';
    params: {
        from: ColorValueInput;
        to: ColorValueInput;
        steps: number;
        quantize?: number;
    };
};

export type ColorSetAnchoredInput = InputRecord & {
    model: 'color-set/anchored';
    params: {
        anchor: ColorValueInput;
    } & AnchoredColorListParams;
};
