import type { StoreError } from '../../store';

export const formatStoreError = (err: StoreError): string => {
    const { msg, error } = err;
    return `🟥 ${msg} \n${error?.stack}`;
};
