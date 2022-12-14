import fs from 'fs'
import { parse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string
    description: string
}

class ImportCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository){}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {

            const stream = fs.createReadStream(file.path)

            const categories: IImportCategory[] = []

            const parseFile = parse()

            stream.pipe(parseFile)

            parseFile.on('data', file => {
                const [name, description] = file

                categories.push({
                    name,
                    description
                })
            })
                .on('end', () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
                .on('error', error => {
                    reject(error)
                })
        })
    }


async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file)

        categories.forEach(category => {

            const { name, description } = category

            const nameAlreadyExists = this.categoriesRepository.findByName(name)

            if (!nameAlreadyExists){

                this.categoriesRepository.create({
                    name,
                    description
                })
            }

        })

    }


}

export { ImportCategoryUseCase }


// csv parse librarie

//pipe pega oq ta sendo lido da stream e joga para onde nos determinar
