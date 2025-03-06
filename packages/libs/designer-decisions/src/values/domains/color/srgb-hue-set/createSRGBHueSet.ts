import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { SRGBHueSet, SRGBHueValue } from '../types';

export const createSRGBHueSet = (context: ValueContext<SRGBHueValue[]>): SRGBHueSet => {
    return createBaseSet(context);
};
