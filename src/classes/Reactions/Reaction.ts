import IReactive from "../Interfaces & Abstractions/IReactive";
import ISpecie from "../Interfaces & Abstractions/ISpecie";

export default class Reaction {
    reactants: Array<[IReactive & ISpecie, number]>;
    products: Array<[IReactive & ISpecie, number]>;
    dH0x: number;

    /**
     * 
     * @param reactants array of reactive specie objects
     * @param reactantCoeff array of coefficients of reactants, size = size of reactants
     * @param products array of reactive specie objects
     * @param productCoeff array of coefficients of products, size = size of products
     */
    constructor(reactants: (IReactive & ISpecie)[], reactantCoeff: number[],
        products: (IReactive & ISpecie)[], productCoeff: number[])
    {
        for (let i = 0; i < reactants.length; i++) {
            this.reactants.push([reactants[i], reactantCoeff[i]]);
        }
        for (let i = 0; i < products.length; i++) {
            this.products.push([products[i], productCoeff[i]]);
        }

        // By default calculating dH0x with respect to A
        this.update_dH0x('reactant', 0);
    }

    /**
     * updates heat of reaction
     * @param relativeTo choose reactant or product for reference
     * @param specieIndex index of specie in reaction array
     */
    update_dH0x(relativeTo: 'reactant'|'product', specieIndex: number) {
        let coeff;
        if(relativeTo == 'reactant') {
            coeff = this.reactants[specieIndex][1];
        } else {
            coeff = this.products[specieIndex][1];
        }
        
        let dH0products = 0;
        let dH0reactants = 0;

        for (let i = 0; i < this.reactants.length; i++) {
            dH0reactants = dH0reactants + this.reactants[i][1] / coeff * this.reactants[i][0].dHf;
        }
        for (let i = 0; i < this.products.length; i++) {
            dH0products = dH0products + this.products[i][1] / coeff * this.products[i][0].dHf;
        }

        this.dH0x = dH0products - dH0reactants;
    }

    /**
     * helper function calculates the integral of dCp
     * @param relativeTo choose reactant or product for reference
     * @param specieIndex index of specie in reaction array
     * @param temperature final temperature of intergration
     */
    private calculatedIntegralCp(relativeTo: 'reactant'|'product', specieIndex: number, temperature: number) {
        let coeff;
        if(relativeTo == 'reactant') {
            coeff = this.reactants[specieIndex][1];
        } else {
            coeff = this.products[specieIndex][1];
        }

        let dCpproducts = 0;
        let dCpreactants = 0;

        for (let i = 0; i < this.reactants.length; i++) {
            dCpreactants = dCpreactants + this.reactants[i][1] / coeff * this.reactants[i][0].integrateCp(this.reactants[i][0].Tr, temperature);
        }
        for (let i = 0; i < this.products.length; i++) {
            dCpproducts = dCpproducts + this.products[i][1] / coeff * this.products[i][0].integrateCp(this.reactants[i][0].Tr, temperature);
        }

        return this.dH0x = dCpproducts - dCpreactants;
    }

    /**
     * 
     * @param temp [K]
     * @param relativeTo
     * @param specieIndex 
     * @returns dHrx of temperature relative to given specie at given temperature
     */
    dHRx(temp: number, relativeTo: 'reactant'|'product' = 'reactant', specieIndex: number = 0) {
        return this.dH0x * this.calculatedIntegralCp(relativeTo, specieIndex, temp);
    }
}