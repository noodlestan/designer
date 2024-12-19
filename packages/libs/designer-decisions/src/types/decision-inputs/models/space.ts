import { SignedSpaceInput, SpaceInput } from '../primitives';

import { DecisionInput } from './base';

export type SpaceValueExplicitInput = DecisionInput & {
    type: 'space-value/explicit';
    params: {
        value: SpaceInput;
    };
};

export type SpaceScaleExplicitInput = DecisionInput & {
    type: 'space-scale/explicit';
    params: {
        values: SpaceInput[];
    };
};

export type spaceScaleLinearRangeInput = DecisionInput & {
    type: 'space-scale/linear-range';
    params: {
        from: SpaceInput;
        to: SpaceInput;
        steps: number;
    };
};

export type spaceScaleModifierInput = DecisionInput & {
    type: 'space-scale/modifier-range';
    params: {
        start: SpaceInput;
        modifier: SignedSpaceInput;
        steps: number;
    };
};

export type SpaceDecisionInput = SpaceScaleExplicitInput | SpaceValueExplicitInput;
