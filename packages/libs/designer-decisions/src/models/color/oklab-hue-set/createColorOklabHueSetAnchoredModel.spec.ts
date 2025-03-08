import { describe, expect, it } from 'vitest';

import type { ColorOklabHueSetAnchoredInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabHueSetAnchoredModel } from './createColorOklabHueSetAnchoredModel';

describe('createColorOklabHueSetAnchoredModel()', () => {
    const model = createColorOklabHueSetAnchoredModel();

    describe('Given a context and params', () => {
        const expectedLength = 6;
        const params: ColorOklabHueSetAnchoredInput['params'] = {
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
            expect(result.items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toNumber()).toEqual(329.9);
            expect(result.item(2)?.toNumber()).toEqual(params.anchor);
            expect(result.last()?.toNumber()).toEqual(360);
        });
    });

    describe('Given a quantize param', () => {
        const params: ColorOklabHueSetAnchoredInput['params'] = {
            anchor: 333.001,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.7 },
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

            expect(result.first()?.toNumber()).toEqual(332);
            expect(result.item(2)?.toNumber()).toEqual(334);
            expect(result.last()?.toNumber()).toEqual(360);
        });
    });
});
