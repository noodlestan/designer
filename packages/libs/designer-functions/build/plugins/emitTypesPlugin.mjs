import { exec } from 'child_process';

export function generateTypes(target) {
    console.info(`Emitting TypeScript declarations for ${target} target...`);

    const process = exec(`npm run build:types:${target}`, (error, _stdout, stderr) => {
        if (error) {
            console.error(`🟥 TypeScript error (${target}):`, error.message);
            return;
        }
        if (stderr) {
            console.error(`🟨 TypeScript warning (${target}):`, stderr);
        }
        console.info(`🟩 TypeScript declarations emitted for ${target} target.`);
    });

    process.stdout.on('data', data => console.info(data.toString()));
    process.stderr.on('data', data => console.error(data.toString()));
}

export function emitTypesPLugin(target) {
    return {
        name: 'emitTypes',
        setup(build) {
            build.onEnd(result => {
                if (result.errors.length || result.warnings.length) {
                    console.error(
                        `🟨 Skipping type declarations for ${target} target due to build errors.`,
                    );
                } else {
                    generateTypes(target);
                }
            });
        },
    };
}
