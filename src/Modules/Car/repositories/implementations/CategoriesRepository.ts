import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

interface ICreateCategoryDTO {
    name: string
    description: string
}


class CategoriesRepository implements ICategoriesRepository{

    private repository: Repository<Category>

    private static INSTANCE: CategoriesRepository

    private constructor(){
        this.repository = getRepository(Category)
    }

    public static getInstance(): CategoriesRepository {

        if(!CategoriesRepository.INSTANCE){

            CategoriesRepository.INSTANCE = new CategoriesRepository()
        }

        return CategoriesRepository.INSTANCE
    }

    async create({name, description}: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            description,
            name
        })
      
    
        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {

        const categories = await this.repository.find()

        return categories
    }

    async findByName(name: string): Promise<Category> {

        const fByName = await this.repository.findOne({name})

        return fByName
    }
}


export { CategoriesRepository, ICreateCategoryDTO }