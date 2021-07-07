export default class RK45 {
    calculateConcentrations(FaFbFc: number[][], vFlow: number) {
        let c: Array<number>;
        for (let i = 0; i < FaFbFc[0].length; i++) {
            c.push(FaFbFc[0][i] / vFlow);
        }
        return c;
    }
    //calculateRates(concentrations: number[],  temperature: number)
}