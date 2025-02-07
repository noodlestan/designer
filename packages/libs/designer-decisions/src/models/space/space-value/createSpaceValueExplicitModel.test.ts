import { describe, expect, it } from 'vitest';

import { createValueContextMock } from '../../../mocks';
import type { SpaceValueExplicitInput } from '../../../types';

import { createSpaceValueExplicitModel } from './createSpaceValueExplicitModel';

describe('createSpaceValueExplicitModel()', () => {
    const model = createSpaceValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: SpaceValueExplicitInput['params'] = {
            value: 2.111,
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual(params.value + 'px');
        });
    });

    describe('Given a context precision', () => {
        const [mockContext] = createValueContextMock();
        const params: SpaceValueExplicitInput['params'] = {
            value: 2.111,
            precision: 4,
        };

        it('should round the value', () => {
            const result = model.produce(mockContext, params);

            expect(result.get()).toEqual('4px');
        });
    });
});
