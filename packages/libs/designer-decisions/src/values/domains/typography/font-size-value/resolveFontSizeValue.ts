import { type SizeObjectLiteral, type SizeValueInput } from '../../../../inputs';
import { type ValueContext } from '../../../../value';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_DEFINITION } from './private';

export const resolveFontSizeValue = (
    context: ValueContext,
    input: SizeValueInput,
): SizeObjectLiteral => resolveSizeBaseValue(SIZE_DEFINITION, context, input);
