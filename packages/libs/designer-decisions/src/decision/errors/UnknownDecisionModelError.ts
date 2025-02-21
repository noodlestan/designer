export class UnknownDecisionModelError extends Error {
    constructor(model: string) {
        const message = `Unknown decision model "${model}".`;
        super(message);
        this.name = 'UnknownDecisionModelError';
    }
}
