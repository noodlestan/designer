import type { AnchoredColorListParams, ColorInputValue } from '../../primitives';
import type { DecisionInputBase } from '../base';

export type ColorSetExplicitInput = DecisionInputBase & {
    model: 'color-set/explicit';
    params: {
        values: ColorInputValue[];
    };
};

export type ColorSetBoundedInput = DecisionInputBase & {
    model: 'color-set/bounded';
    params: {
        from: ColorInputValue;
        to: ColorInputValue;
        steps: number;
    };
};

export type ColorSetAnchoredInput = DecisionInputBase & {
    model: 'color-set/anchored';
    params: {
        anchor: ColorInputValue;
    } & AnchoredColorListParams;
};
