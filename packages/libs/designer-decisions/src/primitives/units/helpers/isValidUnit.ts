export function isValidUnit<T extends string = string>(
    unit: string,
    validUnits: T[],
): T | undefined {
    const trimmed = unit && ((unit as string).trim() as T);
    return trimmed && validUnits.includes(trimmed) ? trimmed : undefined;
}
