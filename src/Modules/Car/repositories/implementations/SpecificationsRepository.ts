import { Specification } from "../../entities/Specification";
import { ICreateSpecification, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {

    private specifications: Specification[]

    constructor(){
        this.specifications = []
    }

    create({name, description}: ICreateSpecification): void {

        const specification = new Specification()

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        })
    
        this.specifications.push(specification)
    }

    findByName(name: string): Specification {

        const fByName = this.specifications.find(specification => specification.name === name)

        return fByName
    }


}

export { SpecificationsRepository }