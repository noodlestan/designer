import { describe, expect, it } from 'vitest';

import type { SizeScaleAnchoredInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSizeScaleAnchoredModel } from './createSizeScaleAnchoredModel';

describe('createSizeScaleAnchoredModel()', () => {
    const model = createSizeScaleAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
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

        it('should create a set of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the set', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.toString()).toEqual(49.9 + 'px');
            expect(result.get().item(2)?.toString()).toEqual(params.anchor + 'px');
            expect(result.get().last()?.toString()).toEqual(110 + 'px');
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
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
            quantize: 2,
        };

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.toString()).toEqual('50px');
        });
    });
});
