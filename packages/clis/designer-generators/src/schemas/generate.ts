import { EventEmitter } from 'events';

import { type SchemaGeneratorConfig } from '@noodlestan/designer-decisions';
import { rimraf } from 'rimraf';

import {
    findDecisionTypes,
    findPrimitives,
    normalizeDecisionTypes,
    writeSchemas,
} from './functions';
import { normalizePrimitives } from './functions/normalize/normalizePrimitives';
import {
    SchemaGenerator,
    SchemaGeneratorEvent,
    SchemaGeneratorEventListener,
    SymbolInfo,
} from './types';

export function createSchemaGenerator(
    targetDir: string,
    configs: SchemaGeneratorConfig[],
    moduleResolver: (moduleName: string) => Promise<string>,
): SchemaGenerator {
    const eventEmitter = new EventEmitter();

    const cache = {
        primitiveInfos: [] as SymbolInfo[],
        decisionTypeInfos: [] as SymbolInfo[],
    };

    const emit = (event: SchemaGeneratorEvent) => {
        eventEmitter.emit('event', event);
    };

    const discover = async () => {
        const promises = configs.map(async config => {
            cache.primitiveInfos = await findPrimitives(config, moduleResolver);
            cache.decisionTypeInfos = await findDecisionTypes(config, moduleResolver);

            const primitivesCount = cache.primitiveInfos.length;
            emit({ type: 'info', value: `🐘 Discovered ${primitivesCount} primitives` });
            cache.primitiveInfos.forEach(info =>
                emit({ type: 'info', value: ` - ${info.symbolName} ... ${info.schemaId}` }),
            );

            const decisionTypeCount = cache.decisionTypeInfos.length;
            emit({ type: 'info', value: `🐘 Discovered ${decisionTypeCount} decision types` });
            cache.decisionTypeInfos.forEach(info =>
                emit({ type: 'info', value: ` - ${info.symbolName} ... ${info.schemaId}` }),
            );
        });

        await Promise.all(promises);
    };

    const generate = async () => {
        await rimraf(targetDir);

        const primitives = normalizePrimitives(cache.primitiveInfos);
        const decisionTypes = normalizeDecisionTypes(cache.decisionTypeInfos);
        const allSchemas = [...primitives, ...decisionTypes];

        const files = writeSchemas(targetDir, allSchemas);
        files.forEach(value => emit({ type: 'generated', value }));

        return files;
    };

    const api: SchemaGenerator = {
        discover,
        generate,
        on: (event: 'event', callback: SchemaGeneratorEventListener) =>
            eventEmitter.on(event, callback),
    };

    return api;
}
