import { ColorOklabDecisionTypes } from './oklab';
import { ColorSetDecisionTypes } from './set';
import { ColorSRGBDecisionTypes } from './srgb';
import { ColorValueDecisionTypes } from './value';

export const ColorDecisionTypes = [
    ...ColorOklabDecisionTypes,
    ...ColorSetDecisionTypes,
    ...ColorSRGBDecisionTypes,
    ...ColorValueDecisionTypes,
];
