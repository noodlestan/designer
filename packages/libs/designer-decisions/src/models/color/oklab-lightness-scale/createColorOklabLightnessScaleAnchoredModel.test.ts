import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabLightnessScaleAnchoredInput } from '../../../types';

import { createColorOklabLightnessScaleAnchoredModel } from './createColorOklabLightnessScaleAnchoredModel';

describe('createColorOklabLightnessScaleAnchoredModel()', () => {
    const model = createColorOklabLightnessScaleAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
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

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toBeCloseTo(0.3);
            expect(result.get().item(2)?.get()).toEqual(params.anchor);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });

    describe('Given a precision', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: ColorOklabLightnessScaleAnchoredInput['params'] = {
            anchor: 0.5,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.01 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 0.2 },
            },
            precision: 0.02,
        };

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toBeCloseTo(0.48);
            expect(result.get().item(2)?.get()).toEqual(params.anchor);
            expect(result.get().last()?.get()).toEqual(1);
        });
    });
});
