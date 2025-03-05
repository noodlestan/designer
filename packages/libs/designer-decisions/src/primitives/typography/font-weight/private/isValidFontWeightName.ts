import { FONT_WEIGHTS_BY_NAME } from '../constants';

export const isValidFontWeightName = (value: string): boolean => {
    return value in FONT_WEIGHTS_BY_NAME;
};
