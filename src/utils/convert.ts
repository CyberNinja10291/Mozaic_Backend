export function convertToUsd(
    tokenAmount: number,
    price: number
) {
    return tokenAmount * price;
}

export function applyFactor(value: number, factor: number): number {
    return value * factor / 1e30;
}

export function convertToTokenAmount(
    usd: number,
    price: number
) {
    return price == 0 ? 0 : usd / price;
}