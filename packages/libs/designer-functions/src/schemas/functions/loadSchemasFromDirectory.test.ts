import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import type { SchemaSource } from '@noodlestan/designer-decisions';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type StoreContext, createStoreContext } from '../../store';

import { loadSchemasFromDirectory } from './loadSchemasFromDirectory';

describe('loadSchemasFromDirectory()', () => {
    const fileHandler = vi.fn();
    const source: SchemaSource = {
        urnBase: 'foo',
        source: {
            type: 'path',
            path: 'bar/',
        },
    };
    let context: StoreContext;

    beforeEach(() => {
        context = createStoreContext();
        vi.resetAllMocks();
    });

    it('should call fileHandler for .json files', async () => {
        const mockDirPath = '/mock/dir';
        const mockFiles = ['file1.json', 'file2.txt', 'subdir'] as unknown as Dirent[];
        const mockSubDirFiles = [] as unknown as Dirent[];

        const readDirMock = async (dirPath: string): Promise<Dirent[]> => {
            const filesMap: Record<string, Dirent[]> = {
                [mockDirPath]: mockFiles,
                [path.join(mockDirPath, 'subdir')]: mockSubDirFiles,
            };
            return filesMap[dirPath] || [];
        };

        const statMock = async (filePath: string) => {
            const statMap: Record<string, { isFile: () => boolean; isDirectory: () => boolean }> = {
                [mockDirPath]: {
                    isFile: () => false,
                    isDirectory: () => true,
                },
                [path.join(mockDirPath, 'subdir')]: {
                    isFile: () => false,
                    isDirectory: () => true,
                },
                [path.join(mockDirPath, 'file1.json')]: {
                    isFile: () => true,
                    isDirectory: () => false,
                },
                [path.join(mockDirPath, 'file2.txt')]: {
                    isFile: () => true,
                    isDirectory: () => false,
                },
            };
            return statMap[filePath] || { isFile: () => true, isDirectory: () => false };
        };

        vi.spyOn(fs, 'readdir').mockImplementation(
            readDirMock as unknown as (typeof fs)['readdir'],
        );
        vi.spyOn(fs, 'stat').mockImplementation(statMock as unknown as (typeof fs)['stat']);

        await loadSchemasFromDirectory(context, source, mockDirPath, fileHandler);

        expect(fileHandler).toHaveBeenCalledOnce();
        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'file1.json'));
    });

    it('should recurse into subdirectories', async () => {
        const mockDirPath = '/mock/dir';
        const mockFiles = ['subdir'] as unknown as Dirent[];
        const mockSubDirFiles = ['file1.json', 'file2.json'] as unknown as Dirent[];

        const readDirMock = async (dirPath: string): Promise<Dirent[]> => {
            const filesMap: Record<string, Dirent[]> = {
                [mockDirPath]: mockFiles,
                [path.join(mockDirPath, 'subdir')]: mockSubDirFiles,
            };
            return filesMap[dirPath] || [];
        };

        const statMock = async (filePath: string) => {
            const statMap: Record<string, { isFile: () => boolean; isDirectory: () => boolean }> = {
                [mockDirPath]: {
                    isFile: () => false,
                    isDirectory: () => true,
                },
                [path.join(mockDirPath, 'subdir')]: {
                    isFile: () => false,
                    isDirectory: () => true,
                },
                [path.join(mockDirPath, 'subdir', 'file1.json')]: {
                    isFile: () => true,
                    isDirectory: () => false,
                },
                [path.join(mockDirPath, 'subdir', 'file2.json')]: {
                    isFile: () => true,
                    isDirectory: () => false,
                },
                [path.join(mockDirPath, 'file3.txt')]: {
                    isFile: () => true,
                    isDirectory: () => false,
                },
            };
            return statMap[filePath] || { isFile: () => true, isDirectory: () => false };
        };

        vi.spyOn(fs, 'readdir').mockImplementation(
            readDirMock as unknown as (typeof fs)['readdir'],
        );
        vi.spyOn(fs, 'stat').mockImplementation(statMock as unknown as (typeof fs)['stat']);

        await loadSchemasFromDirectory(context, source, mockDirPath, fileHandler);

        expect(fileHandler).toHaveBeenCalledTimes(2);
        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'subdir', 'file1.json'));
        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'subdir', 'file2.json'));
    });

    it('should handle errors during fs operations', async () => {
        const mockDirPath = '/mock/dir';

        vi.spyOn(fs, 'readdir').mockRejectedValueOnce(new Error('Failed to read directory'));

        await loadSchemasFromDirectory(context, source, mockDirPath, fileHandler);

        expect(context.hasErrors()).toBe(true);
        expect(context.errors().length).toBe(1);
        expect(context.errors()[0].message()).toContain('Invalid SchemaSource "foo"');
        expect(context.errors()[0].message()).toContain('reading directory.');
        expect(context.errors()[0].message()).toContain('/mock/dir');
    });
});
