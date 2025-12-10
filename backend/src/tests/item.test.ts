import request from 'supertest'
import app from '../app.ts'
import prisma from '../prisma/client.ts'

let testCategoryId: number

beforeAll(async () => {
  const cat = await prisma.itemCategory.create({ data: { name: 'Test Weapons' } })
  testCategoryId = cat.id
})

afterAll(async () => {
  await prisma.item.deleteMany()
  await prisma.itemCategory.deleteMany({ where: { name: 'Test Weapons' } })
  await prisma.$disconnect()
})

describe('Item API', () => {
  it('should create an item', async () => {
    
    const res = await request(app)
      .post('/api/items')
      .send({
        name: 'Test Sword',
        categoryId: testCategoryId,
        rarity: 'Epic',
        levelRequirement: 10,
        stats: { damage: 100 }
      })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Test Sword')
    expect(res.body.category.name).toBe('Test Weapons')
  })

  it('should filter by rarity', async () => {
    const res = await request(app).get('/api/items?rarity=Epic')
    expect(res.status).toBe(200)
    expect(res.body.total).toBeGreaterThan(0)
    expect(res.body.items.every((i: any) => i.rarity === 'Epic')).toBe(true)
  })
})