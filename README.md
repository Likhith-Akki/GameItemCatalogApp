# GameItemCatalogApp

A REST API for managing game items and categories — inspired by the real game - Mini Militia.

Runs with one Docker command. Documented with Swagger. Includes tests.  

## Tech Stack

- Node.js 20 + Express + TypeScript
- Prisma ORM  + PostgreSQL
- Zod validation
- Jest + Supertest
- Swagger UI
- Docker

# Features

- Full CRUD for Items & Categories
- Filter items: `?rarity=Legendary&category=Weapons`
- Zod (validation)
- Layered architecture
- Swagger UI at `/api-docs`
- Automated tests (Jest + Supertest)
- Docker + one-command start (DB + seed + API)

## One Command Start

Clone the repo and make sure Docker Desktop is running.

From the **backend** directory run below docker cmd:

# bash shell
docker compose up --build


- API → http://localhost:5000
- Swagger → http://localhost:5000/api-docs
- PostgreSQL runs automatically with seeded data in docker.


## Local Development
Make sure you are in the **backend** directory.

1. Create `.env` manually
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gameitemcatalog?schema=public"

2. Install dependencies
npm install

3. Generate Prisma client
npx prisma generate

4. Run only DB container 
docker compose up -d db

5. Setup DB schema (make sure Docker Desktop is running)
npx prisma db push

6. Seed data into the DB from seed.mts
npm run seed

7. Check if seeding was successful (DB UI view) - optional
npx prisma studio
(you will see two tables - itemCategory and items with seeded data)

8. Run with hot reload
npm run dev

9. Tests
npm test 
(NOTE: Tests use the real DB and clean up after execution, so re-seed the DB again with npm run seed. Need to isolate the tests in the future.)





