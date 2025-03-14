import type { SizeInput, SizeLiteral } from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { resolveSizeBaseValue } from '../../../base';

import { SIZE_DEFINITION } from './private';

export const resolveSizeValue = (
    context: ValueContext<SizeInput>,
): DeepPartial<SizeLiteral> | undefined => {
    return resolveSizeBaseValue(SIZE_DEFINITION, context);
};
