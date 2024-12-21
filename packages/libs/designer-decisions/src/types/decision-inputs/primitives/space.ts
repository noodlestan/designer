/** space */

import type { DecisionRef } from '../../decision-values';

export type SpaceRefOfSpaceValue = DecisionRef & {
    $type: 'space-value';
};

export type SpaceRawInput = string | number;

export type SpaceInputUnits = 'px' | 'em' | 'rem';

export type SpaceWithUnitsInput = { value: number; units: SpaceInputUnits };

export type SpaceInput = SpaceRefOfSpaceValue | SpaceRawInput | SpaceWithUnitsInput;
