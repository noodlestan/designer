import type { Color as ChromaColor } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral, NormalNumber } from '../../../../inputs';
import type { BaseSet } from '../../../base';
import type { BaseValue } from '../../../base/value';
import type { NumberValueOptions } from '../../number/types';

export type AlphaValue = BaseValue<NormalNumber>;

export type ColorValueOptions = NumberValueOptions;

export type ColorValueFormatOptions = ColorValueOptions;

export type Color = {
    get: () => ChromaColor;
    toObject<T extends ColorObjectLiteral = ColorObjectLiteral>(
        format: ColorFormat,
        options?: ColorValueFormatOptions,
    ): T;
    toString(format: ColorFormat, options?: ColorValueFormatOptions): string;
};

export type ColorValue = BaseValue<ChromaColor> & Color;

export type ColorSet = BaseSet<ColorValue>;
