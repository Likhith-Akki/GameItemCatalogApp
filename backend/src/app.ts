import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import categoryRoutes from './routes/categoryRoutes.ts'
import itemRoutes from './routes/itemRoutes.ts'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

const app = express()

app.use(cors())
app.use(express.json())

// Health route
app.get('/', (req, res) => {
  res.json({ message: 'GameItemCatalogApp API is running'})
})

// Routes

app.use('/api/categories', categoryRoutes)
app.use('/api/items', itemRoutes)

const swaggerDocument = yaml.load('./openapi.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


export default app