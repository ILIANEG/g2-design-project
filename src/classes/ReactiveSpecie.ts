import IReactive from "./Interfaces & Abstractions/IReactive";
import AbstractSpecie from "./Interfaces & Abstractions/Specie.abstract";

export default class ReactiveSpecie extends AbstractSpecie implements IReactive {
    readonly dHf: number; // heat of formation [kJ/mol]

    constructor(
        physProps: [number, number, number], thermCoeff: [number, number, number, number, number],
        dHf: number
    ) {
        super(physProps, thermCoeff);
        this.dHf = dHf;
    }
}