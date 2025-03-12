import type { SizeInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createSizeBaseValue } from '../../../base';
import type { SizeValueOptions } from '../../space';
import type { FontSizeValue } from '../types';

import { SIZE_VALUE_DEFINITION } from './private';

export const createFontSizeValue = (
    context: ValueContext<SizeInput>,
    options: SizeValueOptions = {},
): FontSizeValue => createSizeBaseValue(SIZE_VALUE_DEFINITION, context, options);
