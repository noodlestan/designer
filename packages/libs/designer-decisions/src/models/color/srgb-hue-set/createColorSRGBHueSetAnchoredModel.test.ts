import { describe, expect, it } from 'vitest';

import type { ColorSRGBHueSetAnchoredInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorSRGBHueSetAnchoredModel } from './createColorSRGBHueSetAnchoredModel';

describe('createColorSRGBHueSetAnchoredModel()', () => {
    const model = createColorSRGBHueSetAnchoredModel();

    describe('Given a context and params', () => {
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
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a set of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(329.9);
            expect(result.get().item(2)?.get().toNumber()).toEqual(params.anchor);
            expect(result.get().last()?.get().toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorSRGBHueSetAnchoredInput['params'] = {
            anchor: 333.001,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.07 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
            quantize: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.get().first()?.get().toNumber()).toEqual(332);
            expect(result.get().item(2)?.get().toNumber()).toEqual(334);
            expect(result.get().last()?.get().toNumber()).toEqual(360);
        });
    });
});
