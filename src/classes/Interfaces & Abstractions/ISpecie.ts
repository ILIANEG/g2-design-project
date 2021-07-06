export default interface ISpecie {
    readonly physProps: {
        molarMass: number // [g/mol]
        density: number, // [kg/m^3]
        viscosity: number // [Pa*s]
    }
    readonly thermCoeff: { A: number, B: number, C: number, D: number, E: number }; // heat capacity coefficients

    volumetricFlowRate(molarFlowRate: number): number;
    calculateCp(temperature: number): number;
}