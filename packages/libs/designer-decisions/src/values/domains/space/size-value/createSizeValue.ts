import type { SizeValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createSizeBaseValue } from '../../../base';
import type { SizeValue, SizeValueOptions } from '../types';

import { SIZE_DEFINITION } from './private';

export const createSizeValue = (
    context: ValueContext<SizeValueInput>,
    options?: SizeValueOptions,
): SizeValue => {
    return createSizeBaseValue(SIZE_DEFINITION, context, options);
};
