export class UnknownDecisionModelError extends Error {
    constructor(model: string) {
        const message = `Unknown Decision Model "${model}".`;
        super(message);
        this.name = 'UnknownDecisionModelError';
    }
}
