import type { SizeValueInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { createSizeBaseValue } from '../../../base';
import type { SizeValueOptions } from '../../space';
import type { FontSizeValue } from '../types';

import { SIZE_VALUE_DEFINITION } from './private';

export const createFontSizeValue = (
    context: ValueContext,
    input?: DeepPartial<SizeValueInput>,
    options: SizeValueOptions = {},
): FontSizeValue => createSizeBaseValue(SIZE_VALUE_DEFINITION, context, input, options);
