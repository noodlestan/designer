import type { StaticDecisionStoreError } from '../../store';

export const formatStoreError = (err: StaticDecisionStoreError): string => {
    const { msg, error } = err;
    return `🟥 ${msg} \n${error?.stack}`;
};
