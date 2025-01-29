import { describe, expect, it } from 'vitest';

import type { SchemaId } from '../../types';

import { formatMissingSchemaReferences } from './formatMissingSchemaReferences';

const missingReferencesSingle: [SchemaId, SchemaId[]][] = [['missingSchema1', ['schema1']]];

const missingReferencesMultipleSchemas: [SchemaId, SchemaId[]][] = [
    ['missingSchema1', ['schema1', 'schema2']],
];

const missingReferencesMultipleRefs: [SchemaId, SchemaId[]][] = [
    ['missingSchema1', ['schema1']],
    ['missingSchema2', ['schema2']],
];

const noMissingReferences: [SchemaId, SchemaId[]][] = [];

describe('formatMissingSchemaReferences()', () => {
    it('should format a single missing reference correctly', () => {
        const result = formatMissingSchemaReferences(missingReferencesSingle);
        expect(result).toEqual('Missing schema "missingSchema1", referenced in "schema1".');
    });

    it('should format a single missing reference that appears in multiple schemas', () => {
        const result = formatMissingSchemaReferences(missingReferencesMultipleSchemas);
        expect(result).toEqual('Missing schema "missingSchema1", referenced in "schema1,schema2".');
    });

    it('should format multiple missing references correctly', () => {
        const result = formatMissingSchemaReferences(missingReferencesMultipleRefs);
        expect(result).toEqual(
            'Missing schema "missingSchema1", referenced in "schema1". Missing schema "missingSchema2", referenced in "schema2".',
        );
    });

    it('should throw an error if no missing references are provided', () => {
        expect(() => formatMissingSchemaReferences(noMissingReferences)).toThrowError(
            'No missing schema references to format.',
        );
    });
});
