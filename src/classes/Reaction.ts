import ReactiveSpecie from "./ReactiveSpecie";

export default class Reaction {
    reactants: Array<[ReactiveSpecie, number]>;
    products: Array<[ReactiveSpecie, number]>;
    dH0x: number;

    /**
     * 
     * @param reactants array of reactive specie objects
     * @param reactantCoeff array of coefficients of reactants, size = size of reactants
     * @param products array of reactive specie objects
     * @param productCoeff array of coefficients of products, size = size of products
     */
    constructor(reactants: ReactiveSpecie[], reactantCoeff: number[],
        products: ReactiveSpecie[], productCoeff: number[])
    {
        for (let i = 0; i < reactants.length; i++) {
            this.reactants.push([reactants[i], reactantCoeff[i]]);
        }
        for (let i = 0; i < products.length; i++) {
            this.products.push([products[i], productCoeff[i]]);
        }

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
}