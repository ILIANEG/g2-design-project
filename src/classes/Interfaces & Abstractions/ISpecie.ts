export default interface ISpecie {
    physProps: {
        molarMass: number // [g/mol]
        density: number, // [kg/m^3]
        viscosity: number // [Pa*s]
    }
    thermCoeff: { A: number, B: number, C: number, D: number, E: number }; // heat capacity coefficients

    volumetricFlowRate: (molarFlowRate: number) => number;
    calculateCp: (temperature: number) => number;
    integrateCp: (temperatureR: number, temperature: number) => number;
}