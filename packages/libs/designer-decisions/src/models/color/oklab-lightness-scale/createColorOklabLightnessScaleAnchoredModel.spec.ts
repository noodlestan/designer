import { describe, expect, it } from 'vitest';

import type { ColorOklabLightnessScaleAnchoredInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabLightnessScaleAnchoredModel } from './createColorOklabLightnessScaleAnchoredModel';

describe('createColorOklabLightnessScaleAnchoredModel()', () => {
    const model = createColorOklabLightnessScaleAnchoredModel();

    describe('Given a context and params', () => {
        const expectedLength = 6;
        const params: ColorOklabLightnessScaleAnchoredInput['params'] = {
            anchor: 0.5,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.1 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 0.2 },
            },
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a set of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toBeCloseTo(0.3);
            expect(result.item(2)?.toNumber()).toEqual(params.anchor);
            expect(result.last()?.toNumber()).toEqual(1);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabLightnessScaleAnchoredInput['params'] = {
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
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(0.526);
            expect(result.item(1)?.toNumber()).toEqual(0.536);
            expect(result.last()?.toNumber()).toEqual(1);
        });
    });
});
