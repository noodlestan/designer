import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorSRGBHueSetBoundedModel } from './createColorSRGBHueSetBoundedModel';

describe('createColorSRGBHueSetBoundedModel()', () => {
    const model = createColorSRGBHueSetBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 3;
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 350.725,
            to: 370,
            steps: expectedLength - 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(350.7);
            expect(result.item(1)?.toNumber()).toEqual(355.4);
            expect(result.last()?.toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleBoundedInput['params'] = {
            from: 351.725,
            to: 370,
            steps: 1,
            quantize: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(352);
            expect(result.item(1)?.toNumber()).toEqual(356);
            expect(result.last()?.toNumber()).toEqual(360);
        });
    });
});
