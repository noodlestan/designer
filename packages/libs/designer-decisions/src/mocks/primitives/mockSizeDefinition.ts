import type { SizeValueDefinition } from '../../values';

export const mockSizeDefinition: SizeValueDefinition = {
    valueName: 'foo-size-value',
    primitiveName: 'FooSize',
    validUnits: ['foo', 'bar'],
    defaultUnit: 'bar',
    base: 1,
    quantize: 0.01,
    fallback: 0.05,
    decisionTypes: {
        set: 'some-set',
        value: 'some-value',
    },
};
