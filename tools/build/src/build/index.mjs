import * as esbuild from 'esbuild';

import { cjsConfig } from './config/cjs.mjs';
import { esmConfig } from './config/esm.mjs';
import { emitTypesPLugin } from './plugins/emitTypesPlugin.mjs';

export const createBuild = (options = {}, defaults = {}) => {
    const config = { ...defaults, ...options };

    const watch = async () => {
        const plugins = config.plugins || [];
        config.plugins = [...plugins, emitTypesPLugin(config.format, false)];
        const ctx = await esbuild.context(config);
        return ctx.watch();
    };
    const build = async () => {
        const plugins = config.plugins || [];
        config.plugins = [...plugins, emitTypesPLugin(config.format)];
        return esbuild.build(config);
    };

    return {
        watch,
        build,
    };
};

export const cjs = options => createBuild(options, cjsConfig);
export const esm = options => createBuild(options, esmConfig);
