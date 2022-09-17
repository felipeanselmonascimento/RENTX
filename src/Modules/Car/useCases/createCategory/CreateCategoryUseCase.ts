import { CategoriesRepository, ICreateCategoryDTO } from "../../repositories/CategoriesRepository"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    execute({ name, description }: ICreateCategoryDTO): void {

        const nameAlreadyExists = this.categoriesRepository.findByName(name)

        if (nameAlreadyExists) {
            throw new Error('Name already Exists')
        }

        this.categoriesRepository.create({ name, description })

    }

}

export { CreateCategoryUseCase }