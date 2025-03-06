import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { ColorSet, ColorValue } from '../types';

export const createColorSet = (context: ValueContext<ColorValue[]>): ColorSet => {
    return createBaseSet(context);
};
