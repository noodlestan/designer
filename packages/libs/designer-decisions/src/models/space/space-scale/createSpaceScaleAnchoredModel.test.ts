import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { SpaceScaleAnchoredInput } from '../../../types';

import { createSpaceScaleAnchoredModel } from './createSpaceScaleAnchoredModel';

describe('createSpaceScaleAnchoredModel()', () => {
    const model = createSpaceScaleAnchoredModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 6;
        const params: SpaceScaleAnchoredInput['params'] = {
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

            expect(result.get().first()?.get()).toEqual(49.92 + 'px');
            expect(result.get().item(2)?.get()).toEqual(params.anchor + 'px');
            expect(result.get().last()?.get()).toEqual(110 + 'px');
        });
    });

    describe('Given a precision', () => {
        const [mockContext] = createValueContextMock();
        const params: SpaceScaleAnchoredInput['params'] = {
            anchor: 50,
            before: {
                steps: 2,
                modifier: { mode: 'linear', by: -0.04 },
            },
            after: {
                steps: 3,
                modifier: { mode: 'linear', by: 20 },
            },
            precision: 2,
        };

        it('should round the values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.get()).toEqual('50px');
        });
    });
});
