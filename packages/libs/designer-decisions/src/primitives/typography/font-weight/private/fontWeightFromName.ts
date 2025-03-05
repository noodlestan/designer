import { FONT_WEIGHTS_BY_NAME } from '../constants';

export const fontWeightFromName = (value: string): number | undefined => {
    return FONT_WEIGHTS_BY_NAME[value];
};
