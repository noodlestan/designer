import type { ErrorObject } from 'ajv';

import type { DecisionInputBase } from '../models';

export type DecisionError = {
    decision: DecisionInputBase;
    error: ErrorObject;
};
