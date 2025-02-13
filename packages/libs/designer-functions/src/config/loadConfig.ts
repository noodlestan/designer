import { existsSync } from 'fs';
import { dirname, resolve } from 'path';

import type { DesignerDecisionsConfig, ResolvedConfig } from './private';
import { validateConfig } from './validateConfig';

const CONFIG_FILENAME = 'dd.config.mjs';

export async function loadConfig(
    partial?:
        | ResolvedConfig<DesignerDecisionsConfig>
        | Promise<ResolvedConfig<DesignerDecisionsConfig>>,
): Promise<DesignerDecisionsConfig> {
    if (partial) {
        return validateConfig(partial);
    }

    let currentDir = process.cwd();

    while (currentDir !== dirname(currentDir)) {
        const configPath = resolve(currentDir, CONFIG_FILENAME);

        if (existsSync(configPath)) {
            try {
                const module = await import(configPath);
                return validateConfig(module.default);
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
