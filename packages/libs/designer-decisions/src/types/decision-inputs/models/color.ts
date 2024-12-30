import type {
    ColorInput,
    ColorModifierInput,
    DegreesInput,
    NumberModifierInput,
    PercentageInput,
} from '../primitives';

import type { DecisionInputBase } from './base';

export type ColorHueValueExplicitInput = DecisionInputBase & {
    model: 'color-hue-value/explicit';
    params: {
        value: DegreesInput;
    };
};

export type ColorSaturationValueExplicitInput = DecisionInputBase & {
    model: 'color-saturation-value/explicit';
    params: {
        value: PercentageInput;
    };
};

export type ColorLightnessValueExplicitInput = DecisionInputBase & {
    model: 'color-lightness-value/explicit';
    params: {
        value: PercentageInput;
    };
};

export type ColorValueExplicitInput = DecisionInputBase & {
    model: 'color-value/explicit';
    params: {
        value: ColorInput;
    };
};

export type ColorLightnessScaleExplicitInput = DecisionInputBase & {
    model: 'color-lightness-scale/explicit';
    params: {
        values: PercentageInput[];
    };
};

export type ColorLightnessScaleLinearRangeInput = DecisionInputBase & {
    model: 'color-lightness-scale/linear-range';
    params: {
        from: PercentageInput;
        to: PercentageInput;
        steps: number;
    };
};

export type ColorLightnessScaleModifierInput = DecisionInputBase & {
    model: 'color-lightness-scale/modifier';
    params: {
        start: PercentageInput;
        modifier: NumberModifierInput;
        steps: number;
    };
};

export type ColorSetExplicitInput = DecisionInputBase & {
    model: 'color-set/explicit';
    params: {
        values: ColorInput[];
    };
};

export type ColorSetLinearRangeInput = DecisionInputBase & {
    model: 'color-set/linear-range';
    params: {
        from: ColorInput;
        to: ColorInput;
        steps: number;
    };
};

export type ColorSetModifierInput = DecisionInputBase & {
    model: 'color-set/modifier';
    params: {
        start: ColorInput;
        modifier: ColorModifierInput;
        steps: number;
    };
};
