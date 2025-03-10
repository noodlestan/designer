export function parseValueAndUnit<T extends string = string>(
    input: string,
): Partial<{ value: number; unit: T }> | undefined {
    const trimmedInput = input.trim();

    if (!trimmedInput.length) {
        return;
    }
    const match = trimmedInput.match(/^(-?\d+\.?\d*)\s*(\D+)?$/);

    if (!match) {
        return;
    }

    const [, valueStr, maybeUnit] = match;
    const value = valueStr ? parseFloat(valueStr) : undefined;
    const trimmed = maybeUnit && ((maybeUnit as string).trim() as T);
    const unit = trimmed || undefined;

    return { value, unit };
}
