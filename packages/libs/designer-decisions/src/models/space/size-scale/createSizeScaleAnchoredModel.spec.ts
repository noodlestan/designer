import { describe, expect, it } from 'vitest';

import type { SizeScaleAnchoredInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createSizeScaleAnchoredModel } from './createSizeScaleAnchoredModel';

describe('createSizeScaleAnchoredModel()', () => {
    const model = createSizeScaleAnchoredModel();

    describe('Given a context and params', () => {
        const expectedLength = 6;
        const params: SizeScaleAnchoredInput['params'] = {
            anchor: 50,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.04 },
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

            expect(result.first()?.toString()).toEqual('49.92px');
            expect(result.item(2)?.toString()).toEqual('50px');
            expect(result.last()?.toString()).toEqual('110px');
        });
    });

    describe('Given a quantize param', () => {
        const params: SizeScaleAnchoredInput['params'] = {
            anchor: {
                value: 50,
                unit: 'rem',
            },
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.04 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
            quantize: 0.05,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toString()).toEqual('49.9rem');
            expect(result.item(2)?.toString()).toEqual('50rem');
            expect(result.last()?.toString()).toEqual('110rem');
        });
    });
});
