import type { SizeInput, SizeLiteral } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_VALUE_DEFINITION } from './private';

export const resolveFontSizeValue = (
    context: ValueContext<SizeInput>,
): DeepPartial<SizeLiteral> | undefined => resolveSizeBaseValue(SIZE_VALUE_DEFINITION, context);
