import type {
    ColorInput,
    DegreesInput,
    PercentageInput,
    SignedDegreesInput,
    SignedPercentageInput,
} from '../primitives';

import type { DecisionInput } from './base';

export type ColorHueExplicitInput = DecisionInput & {
    type: 'color-hue/explicit';
    params: {
        value: DegreesInput;
    };
};

export type ColorSaturationExplicitInput = DecisionInput & {
    type: 'color-saturation/explicit';
    params: {
        value: PercentageInput;
    };
};

export type ColorLightnessExplicitInput = DecisionInput & {
    type: 'color-lightness/explicit';
    params: {
        value: PercentageInput;
    };
};

export type ColorValueExplicitInput = DecisionInput & {
    type: 'color-value/explicit';
    params: {
        value: ColorInput;
    };
};

export type ColorLigthnessScaleExplicitInput = DecisionInput & {
    type: 'color-lightness-scale/explicit';
    params: {
        values: PercentageInput[];
    };
};

export type ColorLigthnessScaleLinearRangeInput = DecisionInput & {
    type: 'color-lightness-scale/linear-range';
    params: {
        from: PercentageInput;
        to: PercentageInput;
        steps: number;
    };
};

export type ColorLigthnessScaleModifierInput = DecisionInput & {
    type: 'color-lightness-scale/modifier';
    params: {
        start: PercentageInput;
        modifier: SignedPercentageInput;
        steps: number;
    };
};

export type ColorScaleExplicitInput = DecisionInput & {
    type: 'color-scale/explicit';
    params: {
        values: ColorInput[];
    };
};

export type ColorScaleLinearRangeInput = DecisionInput & {
    type: 'color-scale/linear-range';
    params: {
        from: ColorInput;
        to: ColorInput;
        steps: number;
    };
};

export type ColorScaleModifierInput = DecisionInput & {
    type: 'color-scale/modifier';
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

export type ColorDecisionInput = ColorScaleExplicitInput | ColorValueExplicitInput;
