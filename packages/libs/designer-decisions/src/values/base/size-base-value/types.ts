import type { NumberFormatOptions, Size, SizeDefinition } from '../../../primitives';
import type { BaseValue } from '../base-value';

export type SizeBaseOptions = NumberFormatOptions;

export type SizeValueDefinition = SizeDefinition & {
    valueName: string;
    decisionTypes: {
        value?: string;
        set?: string;
    };
};

export type SizeBaseValue = BaseValue<Size>;
