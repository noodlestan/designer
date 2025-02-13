import type { DesignerDecisionsConfig, ResolvedConfig } from './private';

export async function validateConfig(
    config:
        | ResolvedConfig<DesignerDecisionsConfig>
        | Promise<ResolvedConfig<DesignerDecisionsConfig>>,
): Promise<DesignerDecisionsConfig> {
    const resolved = await config;

    const { options, errors } = resolved;

    if (errors && errors.length) {
        console.error(`🟥 Invalid configuration`);
        Object.entries(options).forEach(([key, value]) => {
            Object.entries(value).forEach(([sub, value]) => console.info(`${key}.${sub}`, value));
        });

        errors.forEach(error => console.error(`- ${error.message()}`));
        process.exit(1);
    }

    return options;
}
