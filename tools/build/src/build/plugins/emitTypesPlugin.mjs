import { spawnSync } from 'child_process';

export function generateTypes(target, exitOnError = true) {
    console.info(`Emitting TypeScript declarations for ${target} target...`);

    const result = spawnSync('npm', ['run', `build:types:${target}`], {
        stdio: 'inherit', // Inherit stdio for proper logging
        env: process.env, // Pass full environment
        shell: true, // Use shell for compatibility
    });

    if (result.error) {
        console.error(`🟥 TypeScript error (${target}):`, result.error.message);
        if (exitOnError) process.exit(1);
    }

    if (result.status !== 0) {
        console.error(`🟥 TypeScript process failed (${target}) with exit code ${result.status}`);
        if (exitOnError) process.exit(result.status);
    } else {
        console.info(`🟩 TypeScript declarations emitted for ${target} target.`);
    }
}

export function emitTypesPLugin(target, exitOnError = true) {
    return {
        name: 'emitTypes',
        setup(build) {
            build.onEnd(result => {
                if (result.errors.length || result.warnings.length) {
                    console.error(
                        `🟨 Skipping type declarations for ${target} target due to build errors.`,
                    );
                } else {
                    generateTypes(target, exitOnError);
                }
            });
        },
    };
}
