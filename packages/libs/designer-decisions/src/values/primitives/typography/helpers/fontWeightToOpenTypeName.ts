import { FONT_WEIGHTS_BY_OT_NAME } from '../constants';

export const fontWeightToOpenTypeName = (value: number): string | undefined => {
    const found = Object.entries(FONT_WEIGHTS_BY_OT_NAME).find(([, weight]) => weight === value);
    if (found) {
        return found[0];
    }
    return undefined;
};
