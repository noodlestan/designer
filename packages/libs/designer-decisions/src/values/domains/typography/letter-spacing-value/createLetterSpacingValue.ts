import type { SizeInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { createSizeBaseValue } from '../../../base';
import type { SizeValueOptions } from '../../space';
import type { LetterSpacingValue } from '../types';

import { SIZE_VALUE_DEFINITION } from './private';

export const createLetterSpacingValue = (
    context: ValueContext<SizeInput>,
    options: SizeValueOptions = {},
): LetterSpacingValue => createSizeBaseValue(SIZE_VALUE_DEFINITION, context, options);
