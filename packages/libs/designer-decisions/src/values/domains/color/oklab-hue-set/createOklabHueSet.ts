import type { ValueContext } from '../../../../value';
import { createBaseSet } from '../../../base';
import type { OklabHueSet, OklabHueValue } from '../../../primitives';

export const createOklabHueSet = (context: ValueContext, input: OklabHueValue[]): OklabHueSet => {
    return createBaseSet(context, input);
};
