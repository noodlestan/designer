import type { NormalNumber, NumberModifier } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorOklabLightnessValueExplicitInput = DecisionInputBase & {
    model: 'color-oklab-lightness-value/explicit';
    params: {
        value: NormalNumber;
    };
};

export type ColorOklabLightnessScaleExplicitInput = DecisionInputBase & {
    model: 'color-oklab-lightness-scale/explicit';
    params: {
        values: NormalNumber[];
    };
};

export type ColorOklabLightnessScaleBoundedInput = DecisionInputBase & {
    model: 'color-oklab-lightness-scale/bounded';
    params: {
        from: NormalNumber;
        to: NormalNumber;
        steps: number;
    };
};

export type ColorOklabLightnessScaleAnchoredInput = DecisionInputBase & {
    model: 'color-oklab-lightness-scale/anchored';
    params: {
        anchor: NormalNumber;
        before?: {
            modifier: NumberModifier;
            steps: number;
        };
        after?: {
            modifier: NumberModifier;
            steps: number;
        };
    };
};
