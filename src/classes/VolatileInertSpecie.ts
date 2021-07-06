import ISpecie from "./Interfaces & Abstractions/ISpecie";
import IVolatile from "./Interfaces & Abstractions/IVolatile";
import Specie from "./Interfaces & Abstractions/Specie.abstract";
import { evaluate } from "mathjs";

export default class VolatileInertSpecie extends Specie implements ISpecie, IVolatile {
    Tb: number // boiling temperature [K]

    constructor(
        physProps: [number, number, number], thermoCoef: [number, number, number, number, number],
        Tb?: number, formulaTb?: {formula: string, values: any}
    ) {
        super(physProps, thermoCoef);
        if(Tb) {
            this.Tb = Tb;
        } else {
            this.updateTb(formulaTb);
        }
    }

    /**
     * 
     * @param formulaTb formula object with formula as string and object with values for string
     */
    updateTb(formulaTb:{formula: string, values: any}) {
        this.Tb = evaluate(formulaTb.formula, formulaTb.values)
    }
}