function isEthereumAddress(input: string): boolean {
    // Regular expression to match Ethereum addresses
    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

    // Check if input matches the regular expression
    return ethereumAddressRegex.test(input);
}

export { isEthereumAddress };