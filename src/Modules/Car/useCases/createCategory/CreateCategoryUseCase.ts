import { CategoriesRepository, ICreateCategoryDTO } from "../../repositories/implementations/CategoriesRepository"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    async execute({ name, description }: ICreateCategoryDTO): Promise<void> {

        const nameAlreadyExists = await this.categoriesRepository.findByName(name)

        if (nameAlreadyExists) {
            throw new Error('Name already Exists')
        }

        this.categoriesRepository.create({ name, description })

    }

}

export { CreateCategoryUseCase }