import type { SizeObjectLiteral } from '../../../inputs';
import type { NumberValueOptions, Size } from '../../primitives';
import type { BaseValue } from '../base-value';

export type SizeValueOptions = NumberValueOptions;

export type SizeDefinition = {
    valueName: string;
    quant: number;
    fallback: SizeObjectLiteral;
    decisionTypes: {
        value?: string;
        set?: string;
    };
};

export type BaseSizeValue = BaseValue<Size> & {
    raw(): number;
    quantized: (quantize?: number) => number;
    toString(options?: SizeValueOptions): string;
    toObject(options?: SizeValueOptions): SizeObjectLiteral;
};
