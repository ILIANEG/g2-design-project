export default interface ICatalyst {
    k: Array<number>;
    E: Array<number>; // [J/mol]
    c: Array<Array<number>>;

    ki: (i: number, temperature: number) => number;
}