import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { SizeScale, SizeValue } from '../types';

export const createSizeScale = (context: ValueContext<SizeValue[]>): SizeScale => {
    return createBaseSet(context);
};
