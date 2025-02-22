import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { ColorSet, ColorValue } from '../../../primitives';

export const createColorSet = (context: ValueContext, input: ColorValue[]): ColorSet => {
    return createBaseSet(context, input);
};
