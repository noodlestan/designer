import fs from 'fs/promises';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SchemaMap } from '../types';

import { loadSchemaFromFile } from './loadSchemaFromFile';

const filePath = 'path/to/schema.json';

const validSchemaData = JSON.stringify({ $id: 'validSchemaId', type: 'object' });
const missingFileError = new Error('File not found');
const invalidJSONContent = 'invalid json content';
const schemaDataWithMissingID = JSON.stringify({ type: 'object' });
const duplicateSchemaData = JSON.stringify({ $id: 'duplicateId', type: 'object' });
const unexpectedError = new Error('Unexpected error occurred');

describe('loadSchemaFromFile', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should load a valid schema and add it to the schema map', async () => {
        const schemas: SchemaMap = new Map();

        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(validSchemaData);

        await loadSchemaFromFile(schemas, filePath);

        expect(schemas.has('validSchemaId')).toBe(true);
        expect(schemas.get('validSchemaId')).toEqual({ $id: 'validSchemaId', type: 'object' });
    });

    it('should throw an error if the file does not exist', async () => {
        vi.spyOn(fs, 'readFile').mockRejectedValueOnce(missingFileError);

        await expect(loadSchemaFromFile(new Map(), filePath)).rejects.toThrow(
            `Error loading schema from "${filePath}": ${missingFileError.message}.`,
        );
    });

    it('should throw an error if the file content is not valid JSON', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(invalidJSONContent);

        await expect(loadSchemaFromFile(new Map(), filePath)).rejects.toThrow(
            `Error loading schema from "${filePath}": Unexpected token`,
        );
    });

    it('should throw an error if the schema does not have a valid $id', async () => {
        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(schemaDataWithMissingID);

        await expect(loadSchemaFromFile(new Map(), filePath)).rejects.toThrow(
            `Error loading schema from "${filePath}": missing a valid "$id" property.`,
        );
    });

    it('should throw an error if a duplicate schema $id is found', async () => {
        const schemas: SchemaMap = new Map([
            ['duplicateId', { $id: 'duplicateId', type: 'object' }],
        ]);

        vi.spyOn(fs, 'readFile').mockResolvedValueOnce(duplicateSchemaData);

        await expect(loadSchemaFromFile(schemas, filePath)).rejects.toThrow(
            `Error loading schema from "${filePath}": duplicate schema id "duplicateId".`,
        );
    });

    it('should handle and rethrow unexpected errors', async () => {
        vi.spyOn(fs, 'readFile').mockImplementationOnce(() => {
            throw unexpectedError;
        });

        await expect(loadSchemaFromFile(new Map(), filePath)).rejects.toThrow(
            `Error loading schema from "${filePath}": ${unexpectedError.message}.`,
        );
    });
});
