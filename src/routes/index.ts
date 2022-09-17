import { Router } from "express";
import { categoriesRoute } from "./Categories.routes";
import { specificationRoutes } from "./Specification.routes";

const router = Router()

router.use('/categories', categoriesRoute)
router.use('/specifications', specificationRoutes)

export { router }