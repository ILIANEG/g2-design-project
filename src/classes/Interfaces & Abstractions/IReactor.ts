import ISpecie from "./ISpecie";
import IReactive from "./IReactive";
import Reaction from "../Reactions/Reaction";

export default interface IReactor {
    inletFlow: {flow: Array<{specie: ISpecie, molarFlowRate: number}>} // [mol/s];
    reactions: Array<Reaction>; // [mol/s];
    volume: number; // [m^3]

    
}