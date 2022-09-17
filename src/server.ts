import express from 'express'
import { router } from './routes'
import swaggerUI from 'swagger-ui-express'
import swaggerFile from './swagger.json'        //colocar resolvejson module como true

import './database'

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(router)

app.listen(3333, () => {
    console.log('Server running on port 3333')
})


// librarie ts-node-dev -D para nao compila toda hora para o js