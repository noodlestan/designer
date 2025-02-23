import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { ColorSet, ColorValue } from '../types';

export const createColorSet = (context: ValueContext, input: ColorValue[]): ColorSet => {
    return createBaseSet(context, input);
};
