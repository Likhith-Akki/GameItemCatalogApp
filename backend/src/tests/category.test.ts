import request from 'supertest'
import app from '../app.ts'
import prisma from '../prisma/client.ts'

describe('Category API', () => {
  afterAll(async () => {
    await prisma.itemCategory.deleteMany({
      where: { name: { contains: 'Test Category' } },
    })
    await prisma.$disconnect()
  })

  it('should create a category', async () => {
    const uniqueName = `Test Category ${Date.now()}`

    const res = await request(app)
      .post('/api/categories')
      .send({ name: uniqueName })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe(uniqueName)
  })

  it('should reject duplicate name', async () => {
    const name = `Duplicate Test ${Date.now()}`

    await request(app).post('/api/categories').send({ name })

    const res = await request(app)
      .post('/api/categories')
      .send({ name })

    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Category with this name already exists')
  })

  it('should list categories', async () => {
    const res = await request(app).get('/api/categories')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})