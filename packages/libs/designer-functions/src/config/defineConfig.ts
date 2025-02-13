import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { createConfigError } from './private';
import type { DeepPartial, DesignerDecisionsConfig, ResolvedConfig } from './private';
import schema from './schema/designer-config.json';

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);

ajv.addKeyword({
    keyword: 'isResolverFunction',
    modifying: false,
    validate: (schemaValue: unknown, data: unknown) => {
        if (schemaValue !== true) {
            return true;
        }
        return typeof data === 'function';
    },
    errors: true,
    error: {
        message:
            'must be a valid ModuleResolverFunction. See https://designer-decisions.noodlestan.org/api/designer-functions/Loader/createDecisionLoader/ for details.',
    },
});

const validate = ajv.compile(schema);

export async function defineConfig(
    options: DeepPartial<DesignerDecisionsConfig>,
): Promise<ResolvedConfig<DesignerDecisionsConfig>> {
    const valid = validate(options);

    if (!valid) {
        return {
            options,
            errors: validate.errors?.map(createConfigError) || [],
        };
    }

    const config = options as DesignerDecisionsConfig;
    return { options: config, errors: [] };
}
