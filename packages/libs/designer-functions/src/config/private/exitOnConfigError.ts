import type { DesignerConfig, ResolvedConfig } from '.';

export async function exitOnConfigError(
    config: ResolvedConfig<DesignerConfig> | Promise<ResolvedConfig<DesignerConfig>>,
): Promise<DesignerConfig> {
    const resolved = await config;

    const { config: options, errors } = resolved;

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
