/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Expression, Program } from 'estree';

import { createAttributeValueExpression } from './createAttributeValueExpression';

export function createIdentifier(name: string) {
    const storeExpression: Expression = {
        type: 'Identifier',
        name,
    };

    const program: Program = {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: storeExpression,
            },
        ],
        sourceType: 'module',
    };

    return createAttributeValueExpression(name, program);
}
