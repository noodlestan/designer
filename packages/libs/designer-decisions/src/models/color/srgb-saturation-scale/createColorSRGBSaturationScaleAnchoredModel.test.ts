import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorSRGBSaturationScaleAnchoredInput } from '../../../types';

import { createColorSRGBSaturationScaleAnchoredModel } from './createColorSRGBSaturationScaleAnchoredModel';

describe('createColorSRGBSaturationScaleAnchoredModel()', () => {
    const model = createColorSRGBSaturationScaleAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: ColorSRGBSaturationScaleAnchoredInput['params'] = {
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
        const params: ColorSRGBSaturationScaleAnchoredInput['params'] = {
            anchor: 0.5,
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

            expect(result.get().first()?.get()).toEqual(0.6);
            expect(result.get().item(1)?.get()).toEqual(0.6);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
