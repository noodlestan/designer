import type { NormalNumber, NumberModifier } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorSRGBLightnessValueExplicitInput = DecisionInputBase & {
    model: 'color-srgb-lightness-value/explicit';
    params: {
        value: NormalNumber;
    };
};

export type ColorSRGBLightnessScaleExplicitInput = DecisionInputBase & {
    model: 'color-srgb-lightness-scale/explicit';
    params: {
        values: NormalNumber[];
    };
};

export type ColorSRGBLightnessScaleBoundedInput = DecisionInputBase & {
    model: 'color-srgb-lightness-scale/bounded';
    params: {
        from: NormalNumber;
        to: NormalNumber;
        steps: number;
    };
};

export type ColorSRGBLightnessScaleAnchoredInput = DecisionInputBase & {
    model: 'color-srgb-lightness-scale/anchored';
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
