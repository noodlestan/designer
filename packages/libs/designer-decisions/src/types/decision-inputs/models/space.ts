import type { NumberModifierInput, SpaceInput } from '../primitives';

import type { DecisionInputBase } from './base';

export type SpaceValueExplicitInput = DecisionInputBase & {
    model: 'space-value/explicit';
    params: {
        value: SpaceInput;
    };
};

export type SpaceScaleExplicitInput = DecisionInputBase & {
    model: 'space-scale/explicit';
    params: {
        values: SpaceInput[];
    };
};

export type SpaceScaleLinearRangeInput = DecisionInputBase & {
    model: 'space-scale/linear-range';
    params: {
        from: SpaceInput;
        to: SpaceInput;
        steps: number;
    };
};

export type SpaceScaleModifierInput = DecisionInputBase & {
    model: 'space-scale/modifier';
    params: {
        start: SpaceInput;
        modifier: NumberModifierInput;
        steps: number;
    };
};

export type SpaceValueDecisionInput = SpaceValueExplicitInput;
export type SpaceScaleDecisionInput =
    | SpaceScaleExplicitInput
    | SpaceScaleLinearRangeInput
    | SpaceScaleModifierInput;

export type SpaceDecisionInput = SpaceValueDecisionInput | SpaceScaleDecisionInput;
