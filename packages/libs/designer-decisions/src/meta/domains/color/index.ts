import { ColorValueDecisionTypes } from './color';
import { ColorOklabDecisionTypes } from './oklab';
import { ColorSRGBDecisionTypes } from './srgb';

export const ColorDecisionTypes = [
    ...ColorValueDecisionTypes,
    ...ColorOklabDecisionTypes,
    ...ColorSRGBDecisionTypes,
];
