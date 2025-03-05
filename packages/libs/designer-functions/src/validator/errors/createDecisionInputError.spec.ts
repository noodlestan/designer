import type { DecisionSource } from '@noodlestan/designer-decisions';
import { describe, expect, it } from 'vitest';

import { createDecisionInputError } from './createDecisionInputError';

describe('createDecisionInputError()', () => {
    const loaded = { model: 'type/model', name: 'Decision name' };
    const input = { model: 'type/model', name: 'Decision name', params: {} };
    const normalized = {
        uuid: '123',
        input,
        source: { name: 'baz' } as DecisionSource,
        loaded,
        file: 'ouch',
        errors: [],
    };
    const reason = 'Because foo';
    const path = 'bar/baz.json';
    const schema = '$foo';
    const value = 42;

    describe('Given a context and an error', () => {
        it('should return a DecisionInputError object with the expected attributes', () => {
            const result = createDecisionInputError({
                normalized,
                reason,
                path,
                schema,
                value,
            });

            expect(result.source).toEqual(normalized.source);
            expect(result.filename).toEqual(normalized.file);
            expect(result.input).toEqual(loaded);
            expect(result.ref).toEqual({ $name: input.name });
            expect(result.reason).toEqual(reason);
            expect(result.model).toEqual(input.model);
            expect(result.path).toEqual(path);
            expect(result.schema).toEqual(schema);
            expect(result.value).toEqual(value);
        });

        it('should return a DecisionError object with the expected message', () => {
            const result = createDecisionInputError({
                normalized,
                reason,
                path,
                schema,
                value,
            });

            expect(result.message()).toContain('Validation error');
            expect(result.message()).toContain('Decision name');
            expect(result.message()).toContain('Because foo');
        });
    });
});
