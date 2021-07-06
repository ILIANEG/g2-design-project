import IReactive from "../Interfaces & Abstractions/IReactive";
import AbstractSpecie from "./Specie";

export default class ReactiveSpecie extends AbstractSpecie implements IReactive {
    dHf: number; // heat of formation [kJ/mol]
    Tr: number; // reference temperature [K]

    constructor(
        physProps: [number, number, number], thermCoeff: [number, number, number, number, number],
        dHf: number, Tr: number
    ) {
        super(physProps, thermCoeff);
        this.dHf = dHf;
        this.Tr = Tr;
    }
}