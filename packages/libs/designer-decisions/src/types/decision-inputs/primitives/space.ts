/** space */

import type { DecisionRef } from '../../decision-values';

export type SpaceScaleRef = DecisionRef & {
    $subset:
        | number[]
        | {
              start: number;
              count: number;
          };
};

export type SpaceRaw = string | number;

export type SpaceUnits = 'px' | 'em' | 'rem';

export type SpaceWithUnits = { value: number; units: SpaceUnits };

export type SpaceValueInput = DecisionRef | SpaceRaw | SpaceWithUnits;
