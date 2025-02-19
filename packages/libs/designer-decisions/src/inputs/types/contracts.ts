import type { Decision, DecisionContext } from '../../decisions';
import type { DecisionSource } from '../../meta';
import type { BaseValue } from '../../primitives';
import type { DeepPartial } from '../../private';

import type { DecisionRef } from './primitives';
import type { DecisionInput } from './primitives/record';

export type LoadedRecord = {
    input: DeepPartial<DecisionInput>;
    source: DecisionSource;
    file?: string;
    uuid?: string;
};

export type DecisionInputError = {
    source: DecisionSource;
    input: DeepPartial<DecisionInput>;
    filename?: string;
    ref: DecisionRef;
    reason: string;
    model: string;
    path?: string;
    schema?: string;
    value?: unknown;
    message: () => string;
};

export type ValidatedRecord = Omit<LoadedRecord, 'record'> & {
    loaded: LoadedRecord['input'];
    input: DecisionInput;
    errors: DecisionInputError[];
};

export type StaticValidatedMap = {
    hasErrors: () => boolean;
    inputErrors: () => DecisionInputError[];
    records: (filter?: (item: ValidatedRecord) => boolean) => ValidatedRecord[];
    findByRef: (ref: DecisionRef) => ValidatedRecord[];
};

export type DecisionRefResolver = <V extends BaseValue<unknown> = BaseValue<unknown>>(
    ref: DecisionRef,
) => [DecisionContext, Decision<V> | undefined];

export type StaticResolver = {
    resolve: DecisionRefResolver;
};
