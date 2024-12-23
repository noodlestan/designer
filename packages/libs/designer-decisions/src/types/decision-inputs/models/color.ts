import type {
    ColorInput,
    DegreesInput,
    PercentageInput,
    SignedDegreesInput,
    SignedPercentageInput,
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
        modifier: SignedPercentageInput;
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
        modifier: {
            hue: SignedDegreesInput;
            lightness: SignedPercentageInput;
            saturation: SignedPercentageInput;
        };
        steps: number;
    };
};

export type ColorHueValueDecisionInput = ColorHueValueExplicitInput;
export type ColorSaturationValueDecisionInput = ColorSaturationValueExplicitInput;
export type ColorLightnessValueDecisionInput = ColorLightnessValueExplicitInput;

export type ColorValueDecisionInput = ColorValueExplicitInput;

export type ColorLightnessScaleDecisionInput =
    | ColorLightnessScaleExplicitInput
    | ColorLightnessScaleLinearRangeInput
    | ColorLightnessScaleModifierInput;

export type ColorSetDecisionInput =
    | ColorSetExplicitInput
    | ColorSetLinearRangeInput
    | ColorSetModifierInput;

export type ColorDecisionInput =
    | ColorHueValueDecisionInput
    | ColorLightnessValueDecisionInput
    | ColorSaturationValueDecisionInput
    | ColorValueDecisionInput
    | ColorLightnessScaleDecisionInput
    | ColorSetDecisionInput;
