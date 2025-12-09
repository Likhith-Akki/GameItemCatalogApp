import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import categoryRoutes from './routes/categoryRoutes.ts'

const app = express()

app.use(cors())
app.use(express.json())

// Health route
app.get('/', (req, res) => {
  res.json({ message: 'GameItemCatalogApp API is running'})
})

// Routes

app.use('/api/categories', categoryRoutes)


export default app