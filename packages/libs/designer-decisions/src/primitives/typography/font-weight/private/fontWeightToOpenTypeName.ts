import type { FontWeightOpenTypeName } from '../../../../inputs';
import { FONT_WEIGHTS_BY_OT_NAME } from '../constants';

export const fontWeightToOpenTypeName = (value: number): FontWeightOpenTypeName | undefined => {
    const found = Object.entries(FONT_WEIGHTS_BY_OT_NAME).find(([, weight]) => weight === value);
    if (found) {
        return found[0] as FontWeightOpenTypeName;
    }
    return undefined;
};
