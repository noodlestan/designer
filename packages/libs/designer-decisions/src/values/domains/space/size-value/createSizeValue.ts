import type { SizeInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createSizeBaseValue } from '../../../base';
import type { SizeValue, SizeValueOptions } from '../types';

import { SIZE_DEFINITION } from './private';

export const createSizeValue = (
    context: ValueContext<SizeInput>,
    options?: SizeValueOptions,
): SizeValue => {
    return createSizeBaseValue(SIZE_DEFINITION, context, options);
};
