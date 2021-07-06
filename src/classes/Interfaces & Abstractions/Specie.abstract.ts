import ISpecie from "./ISpecie";

export default abstract class Specie implements ISpecie{
    readonly physProps: {
        molarMass: number // [g/mol]
        density: number, // [kg/m^3]
        viscosity: number // [Pa*s]
    }
    readonly thermCoeff: { A: number, B: number, C: number, D: number, E: number }; // heat capacity coefficients

   
    constructor(physProps: [number, number, number], thermoCoef: [number, number, number, number, number]) {
        this.physProps.molarMass = physProps[0];
        this.physProps.density = physProps[1];
        this.physProps.viscosity = physProps[2];
        this.thermCoeff = {A: thermoCoef[0], B: thermoCoef[1], C: thermoCoef[2], D: thermoCoef[3], E: thermoCoef[4]};
    }

    /**
     * 
     * @param molarFlowRate [mol/s]
     * @returns volumetric flow rate [m^3/s] at current molar flow rate
     */
    volumetricFlowRate(molarFlowRate: number) {
        return molarFlowRate * this.physProps.molarMass / 1000 / this.physProps.density;
    }

    /**
     * 
     * @param temperature [K]
     * @returns Cp [J/mol K] of the specie at given temperature
     */
    calculateCp(temperature: number) {
        let t = temperature / 1000;
        return this.thermCoeff.A + this.thermCoeff.B * t + this.thermCoeff.C * t ** 2 +
            this.thermCoeff.D * t ** 3 + this.thermCoeff.E / t ** 2;
    }

    /**
     * 
     * @param temperature [K]
     * @returns Cp [J/mol K] of the specie at given temperature
     */
    integrateCp(temperature: number, temperatureR: number) {
        let t = temperature / 1000;
        let tr = temperatureR / 1000;
        //return this.thermCoeff.A * (t**2 - ) + this.thermCoeff.B * t**2 / 2 + this.thermCoeff.C * t**3 / 3 +
        //this.thermCoeff.D * t**4 / 4 - this.thermCoeff.E / t
    }
}