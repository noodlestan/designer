import { describe, expect, it } from 'vitest';

import { ColorSRGBHueSetAnchoredInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSRGBHueSetAnchoredModel } from './createColorSRGBHueSetAnchoredModel';

describe('createColorSRGBHueSetAnchoredModel()', () => {
    const model = createColorSRGBHueSetAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: ColorSRGBHueSetAnchoredInput['params'] = {
            anchor: 330,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.07 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
        };

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(329.9);
            expect(result.get().item(2)?.get()).toEqual(params.anchor);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBHueSetAnchoredInput['params'] = {
            anchor: 333.001,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.01 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
            quantize: 2,
        };

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(334);
            expect(result.get().item(1)?.get()).toEqual(334);
            expect(result.get().last()?.get()).toEqual(360);
        });
    });
});
