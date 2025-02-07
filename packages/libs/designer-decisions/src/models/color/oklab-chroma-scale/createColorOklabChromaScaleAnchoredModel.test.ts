import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { ColorOklabChromaScaleAnchoredInput } from '../../../types';

import { createColorOklabChromaScaleAnchoredModel } from './createColorOklabChromaScaleAnchoredModel';

describe('createColorOklabChromaScaleAnchoredModel()', () => {
    const model = createColorOklabChromaScaleAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: ColorOklabChromaScaleAnchoredInput['params'] = {
            anchor: 0.2,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.005 },
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

            expect(result.get().first()?.get()).toEqual(0.19);
            expect(result.get().item(2)?.get()).toEqual(params.anchor);
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorOklabChromaScaleAnchoredInput['params'] = {
            anchor: 0.1347,
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

            expect(result.get().first()?.get()).toEqual(0.124);
            expect(result.get().item(1)?.get()).toEqual(0.134);
            expect(result.get().last()?.get()).toEqual(0.5);
        });
    });
});
