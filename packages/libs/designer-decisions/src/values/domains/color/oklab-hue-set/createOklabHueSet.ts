import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabHueSet, OklabHueValue } from '../types';

export const createOklabHueSet = (context: ValueContext<OklabHueValue[]>): OklabHueSet => {
    return createBaseSet(context);
};
