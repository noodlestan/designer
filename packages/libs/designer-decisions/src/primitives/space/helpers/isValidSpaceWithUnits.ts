import type { SpaceWithUnits } from '../../../inputs';

import { VALID_UNITS } from './constants';

export const isValidSpaceWithUnits = (input: unknown): input is SpaceWithUnits => {
    if (typeof input !== 'object' || input === null) {
        return false;
    }

    const { value, units } = input as Partial<SpaceWithUnits>;

    if (typeof value !== 'number' || isNaN(value)) {
        return false;
    }

    if (typeof units !== 'string' || !VALID_UNITS.includes(units)) {
        return false;
    }

    return true;
};
