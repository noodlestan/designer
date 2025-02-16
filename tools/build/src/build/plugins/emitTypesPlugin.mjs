import { exec } from 'child_process';

export function generateTypes(target, exitOnError = true) {
    console.info(`Emitting TypeScript declarations for ${target} target...`);

    const child = exec(`npm run build:types:${target}`, (error, _stdout, stderr) => {
        if (error) {
            console.error(`🟥 TypeScript error (${target}):`, error.message);
            if (exitOnError) {
                process.exit(1);
            }
        }
        if (stderr) {
            console.error(`🟨 TypeScript warning (${target}):`, stderr);
        }
        console.info(`🟩 TypeScript declarations emitted for ${target} target.`);
    });

    child.stdout.on('data', data => console.info(data.toString()));
    child.stderr.on('data', data => console.error(data.toString()));
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
