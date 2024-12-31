import type { ErrorObject } from 'ajv';

import type { DecisionInputBase } from '../models';

export type DecisionInputError = {
    decision: DecisionInputBase;
    error: ErrorObject;
};
