import { existsSync } from 'fs';
import { dirname, resolve } from 'path';

import { defineConfig } from './defineConfig';
import type { DeepPartial, DesignerConfig } from './private';
import { exitOnConfigError } from './private/exitOnConfigError';

const CONFIG_FILENAME = 'dd.config.mjs';

export async function loadConfig(config?: DeepPartial<DesignerConfig>): Promise<DesignerConfig> {
    if (config) {
        return exitOnConfigError(defineConfig(config));
    }

    let currentDir = process.cwd();

    while (currentDir !== dirname(currentDir)) {
        const configPath = resolve(currentDir, CONFIG_FILENAME);

        if (existsSync(configPath)) {
            try {
                const module = await import(/* @vite-ignore */ configPath);
                return exitOnConfigError(module.default);
            } catch (error) {
                console.error(`🟥 Could not load config from "${configPath}".`);
                console.error(error);
                process.exit(1);
            }
        }

        currentDir = dirname(currentDir);
    }

    console.error(`🟥 Could not locate "${CONFIG_FILENAME}".`);
    process.exit(1);
}
