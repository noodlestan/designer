import { Dirent } from 'fs';
import fs from 'fs/promises';
import path from 'path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { loadSchemasFromDirectory } from './loadSchemasFromDirectory';

describe('loadSchemasFromDirectory()', () => {
    const fileHandler = vi.fn();

    beforeEach(() => {
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

        await loadSchemasFromDirectory(mockDirPath, fileHandler);

        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'file1.json'));
        expect(fileHandler).not.toHaveBeenCalledWith(path.join(mockDirPath, 'file2.txt'));
        expect(fileHandler).not.toHaveBeenCalledWith(path.join(mockDirPath, 'subdir'));
    });

    it('should recurse into subdirectories', async () => {
        const mockDirPath = '/mock/dir';
        const mockFiles = ['file1.json', 'subdir'] as unknown as Dirent[];
        const mockSubDirFiles = ['file2.json'] as unknown as Dirent[];

        const readDirMock = async (dirPath: string): Promise<Dirent[]> => {
            const filesMap: Record<string, Dirent[]> = {
                [mockDirPath]: mockFiles,
                [path.join(mockDirPath, 'subdir')]: mockSubDirFiles,
            };
            return filesMap[dirPath] || [];
        };

        const statMock = async (filePath: string) => {
            const statMap: Record<string, { isFile: () => boolean; isDirectory: () => boolean }> = {
                [path.join(mockDirPath, 'subdir')]: {
                    isFile: () => false,
                    isDirectory: () => true,
                },
                [path.join(mockDirPath, 'subdir', 'file2.json')]: {
                    isFile: () => true,
                    isDirectory: () => false,
                },
                [path.join(mockDirPath, 'file1.json')]: {
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

        await loadSchemasFromDirectory(mockDirPath, fileHandler);

        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'file1.json'));
        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'subdir', 'file2.json'));
    });

    it('should not call fileHandler for non-JSON files', async () => {
        const mockDirPath = '/mock/dir';
        const mockFiles = ['file1.json', 'file2.txt'] as unknown as Dirent[];

        const readDirMock = async (dirPath: string): Promise<Dirent[]> => {
            const filesMap: Record<string, Dirent[]> = {
                [mockDirPath]: mockFiles,
            };
            return filesMap[dirPath] || [];
        };

        const statMock = async (filePath: string) => {
            const statMap: Record<string, { isFile: () => boolean; isDirectory: () => boolean }> = {
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

        await loadSchemasFromDirectory(mockDirPath, fileHandler);

        expect(fileHandler).toHaveBeenCalledWith(path.join(mockDirPath, 'file1.json'));
        expect(fileHandler).not.toHaveBeenCalledWith(path.join(mockDirPath, 'file2.txt'));
    });

    it('should handle errors during fs operations', async () => {
        const mockDirPath = '/mock/dir';

        vi.spyOn(fs, 'readdir').mockRejectedValueOnce(new Error('Failed to read directory'));

        await expect(loadSchemasFromDirectory(mockDirPath, fileHandler)).rejects.toThrowError(
            'Failed to read directory',
        );
    });
});
