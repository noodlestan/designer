import { ErrorObject } from 'ajv';

import { DecisionInput } from '../models';

export type DecisionError = {
    decision: DecisionInput;
    error: ErrorObject;
};
