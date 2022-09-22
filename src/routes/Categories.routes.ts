import Router from 'express'
import multer from 'multer'
import createCategoryController from '../Modules/Car/useCases/createCategory'
import { importCategoryController } from '../Modules/Car/useCases/importCategory'
import { listCategoriesController } from '../Modules/Car/useCases/listCategories'

const categoriesRoute = Router()

const upload = multer({
    dest: './tmp'
})

categoriesRoute.post('/', (req, res) => {
    return createCategoryController().handle(req, res)
})

categoriesRoute.get('/', (req, res) => {
    return listCategoriesController.handle(req, res)
})

categoriesRoute.post('/import', upload.single('file'), (req, res) => {

    return importCategoryController.handle(req, res)
})


export { categoriesRoute }