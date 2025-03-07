import { describe, expect, it } from 'vitest';

import { ERROR_LAYER_RECORD, ERROR_RECORD_VALIDATION_ERROR } from './constants';
import { createRecordValidationError } from './createRecordValidationError';
import type { DecisionSource } from './types';

describe('createRecordValidationError()', () => {
    const loaded = { model: 'type/model', name: 'Decision name' };
    const input = { model: 'type/model', name: 'Decision name', params: {} };
    const normalized = {
        uuid: '123',
        input,
        source: { name: 'baz' } as DecisionSource,
        filename: 'bar/baz.json',
        loaded,
        file: 'ouch',
        errors: [],
    };
    const reason = 'must be bar';
    const path = '/foo';
    const schema = '$foo';
    const value = 42;

    describe('Given a context and an error', () => {
        it('should return a RecordError object with the expected attributes', () => {
            const result = createRecordValidationError({
                normalized,
                reason,
                path,
                schema,
                value,
            });
            expect(result.layer).toEqual(ERROR_LAYER_RECORD);
            expect(result.name).toEqual(ERROR_RECORD_VALIDATION_ERROR);
            expect(result.source).toEqual(normalized.source);
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
            const result = createRecordValidationError({
                normalized,
                reason,
                path,
                schema,
                value,
            });
            expect(result.message()).toContain('Invalid Record.');
            expect(result.message()).toContain('Value at /foo');
            expect(result.message()).toContain('must be bar');
            expect(result.message()).toContain('Decision name');
        });
    });
});
