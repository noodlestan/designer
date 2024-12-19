import * as fs from 'fs';
import * as path from 'path';

import * as TJS from 'typescript-json-schema';

import { schemaFileName } from './write';

export function writeSchemas(targetPath: string, definitions: TJS.Definition[]): string[] {
    return definitions.map(definition => {
        if (!definition.$id) {
            throw new Error(`Schema is missing $id`);
        }
        const fileName = schemaFileName(definition.$id);
        const filePath = path.join(targetPath, fileName);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, JSON.stringify(definition, null, 2));

        return filePath;
    });
}
