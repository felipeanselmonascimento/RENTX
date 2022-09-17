import { ICreateSpecification, ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

class CreateSpecificationUseCase {

    constructor(private specificationRepository: ISpecificationsRepository){}

    execute({ name, description }: ICreateSpecification): void {

        const nameAlreadyExists = this.specificationRepository.findByName(name)

        if (nameAlreadyExists) {
            throw new Error('Name already Exists')
        }

        this.specificationRepository.create({ name, description })

    }


}

export { CreateSpecificationUseCase }