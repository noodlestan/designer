import { FONT_WEIGHTS_BY_NAME, FONT_WEIGHT_DEFAULT_VALUE } from '../constants';

export const fontWeightFromName = (value: string): number => {
    return FONT_WEIGHTS_BY_NAME[value] || FONT_WEIGHT_DEFAULT_VALUE;
};
