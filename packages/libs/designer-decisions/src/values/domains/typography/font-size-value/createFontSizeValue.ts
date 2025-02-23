import type { SizeValueInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type SizeValueOptions, createSizeBaseValue } from '../../../base';
import type { FontSizeValue } from '../types';

import { SIZE_DEFINITION } from './private';

export const createFontSizeValue = (
    context: ValueContext,
    input: SizeValueInput,
    options: SizeValueOptions = {},
): FontSizeValue => createSizeBaseValue(SIZE_DEFINITION, context, input, options);
