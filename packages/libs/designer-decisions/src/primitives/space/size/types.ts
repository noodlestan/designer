import type { SizeObjectLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';
import type { NumberFormatOptions } from '../../number';
import type { ValueAndUnitDefinition } from '../../units';

export type SizeDefinition = ValueAndUnitDefinition;

export type SizeOptions = NumberFormatOptions;

export type Size = Primitive<SizeObjectLiteral> & {
    quantize: (quantize?: number) => SizeObjectLiteral;
    toNumber: (options?: SizeOptions) => number;
    toString: (options?: SizeOptions) => string;
};
