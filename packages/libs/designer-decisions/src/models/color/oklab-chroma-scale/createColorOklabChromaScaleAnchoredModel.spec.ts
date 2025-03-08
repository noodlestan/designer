import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaScaleAnchoredInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabChromaScaleAnchoredModel } from './createColorOklabChromaScaleAnchoredModel';

describe('createColorOklabChromaScaleAnchoredModel()', () => {
    const model = createColorOklabChromaScaleAnchoredModel();

    describe('Given a context and params', () => {
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
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a set of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(0.19);
            expect(result.item(2)?.toNumber()).toEqual(params.anchor);
            expect(result.last()?.toNumber()).toEqual(0.5);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabChromaScaleAnchoredInput['params'] = {
            anchor: 0.2,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.007 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 0.2 },
            },
            quantize: 1,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(0.19);
            expect(result.item(2)?.toNumber()).toEqual(0.2);
            expect(result.last()?.toNumber()).toEqual(0.5);
        });
    });
});
