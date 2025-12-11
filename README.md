# GameItemCatalogApp

A REST API for managing game items and categories — inspired by the real game - Mini Militia.

Live in one command. Documented with Swagger. Tested. Secure-ready.

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

clone the repo from git link. 
Install docker desktop and have it open.

- make sure you are in backend directory then run below docker cmd.

- bash shell
docker compose up --build


API → http://localhost:5000
Swagger → http://localhost:5000/api-docs
PostgreSQL runs automatically with seeded data in docker.


## Local Development
make sure you are at backend directory

# .env — create this file manually
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gameitemcatalog?schema=public"

# install
npm install

# generate prisma client
npx prisma generate

# setup DB schema(open docker desktop)
npx prisma db push

# seed data into db from seed.mts
npm run seed

# check if data seeding was done successfully (db ui view)
npx prisma studio
(you will see two tables - itemCategory and items with seeded data)

# run with hot reload
npm run dev

# tests
npm test 
(NOTE: tests use the real DB and cleans up after execution, so please re-seed the db again with npm run seed. Need to isolate the tests in future.)





