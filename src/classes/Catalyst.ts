import ICatalyst from "./Interfaces & Abstractions/ICatalyst";
import ISpecie from "./Interfaces & Abstractions/ISpecie";
import Specie from "./Interfaces & Abstractions/Specie.abstract";

export default class Catalyst extends Specie implements ISpecie, ICatalyst {
    k: Array<number>;
    E: Array<number>; // [J/mol]
    c: Array<Array<number>>;

    constructor(physProps: [number, number, number], thermoCoef: [number, number, number, number, number], 
        k: Array<number>, E: Array<number>, c: Array<Array<number>>) {
        super(physProps, thermoCoef);
        this.k = k;
        this.E = E;
        this.c = c;
    }

    ki(i: number, temperature: number) {
        return this.k[i] * Math.exp(-this.E[i] / (8.314 * temperature))
    }
}