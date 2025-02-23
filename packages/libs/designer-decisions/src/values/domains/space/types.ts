import type { SizeObjectLiteral } from '../../../inputs';
import type { BaseSet, BaseValue } from '../../base';
import type { NumberValueOptions, Size } from '../../primitives';

export type SizeValueOptions = NumberValueOptions;

export type SizeFormatOptions = NumberValueOptions;

export type SizeValue = BaseValue<Size> & {
    raw(): number;
    quantized: (quantize?: number) => number;
    toString(options?: SizeFormatOptions): string;
    toObject(options?: SizeFormatOptions): SizeObjectLiteral;
};

export type SizeScale = BaseSet<SizeValue>;
