import type { SizeLiteral, SizeValueInput } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_VALUE_DEFINITION } from './private';

export const resolveLetterSpacingValue = (
    context: ValueContext<SizeValueInput>,
): DeepPartial<SizeLiteral> | undefined => resolveSizeBaseValue(SIZE_VALUE_DEFINITION, context);
