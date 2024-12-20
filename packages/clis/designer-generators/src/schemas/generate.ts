import { EventEmitter } from 'events';

import { type SchemaGeneratorConfig } from '@noodlestan/designer-decisions';
import { rimraf } from 'rimraf';

import {
    findDecisionModels,
    findPrimitives,
    generateModelSchemas,
    generatePrimitiveSchemas,
    writeSchemas,
} from './functions';
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
        modelsInfos: [] as SymbolInfo[],
    };

    const emit = (event: SchemaGeneratorEvent) => {
        eventEmitter.emit('event', event);
    };

    const discover = async () => {
        const promises = configs.map(async config => {
            cache.primitiveInfos = await findPrimitives(config, moduleResolver);
            cache.modelsInfos = await findDecisionModels(config, moduleResolver);

            const primitivesCount = cache.primitiveInfos.length;
            emit({ type: 'info', value: `🐘 Discovered ${primitivesCount} primitives` });
            cache.primitiveInfos.forEach(info =>
                emit({ type: 'info', value: ` - ${info.symbolName} ... ${info.schemaId}` }),
            );

            const modelsCount = cache.modelsInfos.length;
            emit({ type: 'info', value: `🐘 Discovered ${modelsCount} decision types` });
            cache.modelsInfos.forEach(info =>
                emit({ type: 'info', value: ` - ${info.symbolName} ... ${info.schemaId}` }),
            );
        });

        await Promise.all(promises);
    };

    const generate = async () => {
        await rimraf(targetDir);

        const primitives = generatePrimitiveSchemas(cache.primitiveInfos);
        const decisionModels = generateModelSchemas(cache.modelsInfos);
        const allSchemas = [...primitives, ...decisionModels];

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
