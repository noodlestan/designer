export type LookupContexts = {
    all: string[];
    any?: string[];
};

export type ContextWithLookups = {
    lookupContexts: () => LookupContexts;
};
