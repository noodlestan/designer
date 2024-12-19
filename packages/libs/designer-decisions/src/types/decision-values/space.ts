import type { SpaceClampedValue, SpaceValue } from '../primitive-values';

export type SpaceValueDecision = {
    value: () => SpaceValue;
};

export type SpaceScaleDecision = {
    value: () => SpaceValue[];
};

export type SpaceClampedScaleDecision = {
    value: () => SpaceClampedValue[];
};
