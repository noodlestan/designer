import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral, NormalNumber } from '../../decision-inputs';
import type { BaseSet, BaseValue } from '../base';

export type AlphaValue = BaseValue<NormalNumber>;

export type Color = {
    get: () => ChromaColor;
    toObject(format: ColorFormat): ColorObjectLiteral;
    toString(format: ColorFormat): string;
};

export type ColorValue = BaseValue<ChromaColor> & Color;

export type ColorSet = BaseSet<ColorValue>;
