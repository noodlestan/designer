import { DECISION_SPACE_SCALE, DECISION_SPACE_VALUE } from '../../../../constants';
import type { SpaceWithUnits } from '../../../../inputs';

export const VALUE_NAME = 'SpaceValue';
export const FALLBACK_VALUE: SpaceWithUnits = { value: 0, units: 'px' };
export const REF_CHECKED_TYPES = [DECISION_SPACE_VALUE, DECISION_SPACE_SCALE];
