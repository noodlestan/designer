import path from 'path';

import { DESIGNER_DECISIONS_SCHEMA_GENERATOR_CONFIG } from '@noodlestan/designer-decisions';
import { createSchemaGenerator } from '@noodlestan/designer-generators';

const TARGET_DIR = path.resolve('../../packages/libs/designer-schemas/schemas');

const SCHEMAS = [DESIGNER_DECISIONS_SCHEMA_GENERATOR_CONFIG];

async function run() {
    try {
        const resolver = async (moduleName: string) => {
            return `../../node_modules/${moduleName}`;
        };
        const generator = createSchemaGenerator(TARGET_DIR, SCHEMAS, resolver);
        generator.on('event', event => {
            if (event.type === 'generated') {
                console.info(' -', event.value);
            } else {
                console.info(event.value);
            }
        });
        await generator.discover();
        console.info('🔥 Generating schemas');
        const files = await generator.generate();
        console.info(`🐘 Generated ${files.length} schemas`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run();
