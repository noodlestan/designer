import type { ErrorObject } from 'ajv';

import type { DecisionInput } from '../models';

export type DecisionError = {
    decision: DecisionInput;
    error: ErrorObject;
};
