import { describe, expect, it } from 'vitest';

import { ColorSRGBLightnessScaleAnchoredInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorSRGBLightnessScaleAnchoredModel } from './createColorSRGBLightnessScaleAnchoredModel';

describe('createColorSRGBLightnessScaleAnchoredModel()', () => {
    const model = createColorSRGBLightnessScaleAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: ColorSRGBLightnessScaleAnchoredInput['params'] = {
            anchor: 0.5,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.01 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 0.2 },
            },
        };

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.48);
            expect(result.get().item(2)?.get()).toEqual(params.anchor);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorSRGBLightnessScaleAnchoredInput['params'] = {
            anchor: 0.5357,
            before: {
                steps: 1,
                modifier: { mode: 'linear', by: -0.01 },
            },
            after: {
                steps: 5,
                modifier: { mode: 'linear', by: 0.15 },
            },
            quantize: 0.2,
        };

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual(0.526);
            expect(result.get().item(1)?.get()).toEqual(0.536);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
