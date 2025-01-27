import type { AnchoredColorListParams, ColorInputValue } from '../../primitives';
import type { InputRecord } from '../base';

export type ColorSetExplicitInput = InputRecord & {
    model: 'color-set/explicit';
    params: {
        values: ColorInputValue[];
    };
};

export type ColorSetBoundedInput = InputRecord & {
    model: 'color-set/bounded';
    params: {
        from: ColorInputValue;
        to: ColorInputValue;
        steps: number;
    };
};

export type ColorSetAnchoredInput = InputRecord & {
    model: 'color-set/anchored';
    params: {
        anchor: ColorInputValue;
    } & AnchoredColorListParams;
};
