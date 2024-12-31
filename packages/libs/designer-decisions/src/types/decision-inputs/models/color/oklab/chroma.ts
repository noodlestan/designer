import type { ColorOklabAxisLiteral, NumberModifier } from '../../../primitives';
import type { DecisionInputBase } from '../../base';

export type ColorOklabChromaValueExplicitInput = DecisionInputBase & {
    model: 'color-oklab-chroma-value/explicit';
    params: {
        value: ColorOklabAxisLiteral;
    };
};

export type ColorOklabChromaScaleExplicitInput = DecisionInputBase & {
    model: 'color-oklab-chroma-scale/explicit';
    params: {
        values: ColorOklabAxisLiteral[];
    };
};

export type ColorOklabChromaScaleBoundedInput = DecisionInputBase & {
    model: 'color-oklab-chroma-scale/bounded';
    params: {
        from: ColorOklabAxisLiteral;
        to: ColorOklabAxisLiteral;
        steps: number;
    };
};

export type ColorOklabChromaScaleAnchoredInput = DecisionInputBase & {
    model: 'color-oklab-chroma-scale/anchored';
    params: {
        anchor: ColorOklabAxisLiteral;
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
