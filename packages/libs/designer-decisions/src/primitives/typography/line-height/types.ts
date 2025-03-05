import type { LineHeightObjectLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';
import type { NumberFormatOptions } from '../../number';

export type LineHeightFormatOptions = NumberFormatOptions;

export type LineHeight = Primitive<LineHeightObjectLiteral> & {
    quantize: (options?: LineHeightFormatOptions) => LineHeightObjectLiteral;
    toString: (options?: LineHeightFormatOptions) => string;
};
