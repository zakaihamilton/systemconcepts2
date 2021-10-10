export function formatFraction(numerator, denominator) {
    const numeratorStr = (numerator || 0).toString();
    const denominatorStr = (denominator || 0).toString();
    const paddedNumerator = numeratorStr.padStart(denominatorStr.length, '0');
    return paddedNumerator;
}
