// Output error to ensure proper usage
export const assertNeverHit = (x: never) => {
    throw new Error("This line should not be hit.");
}
