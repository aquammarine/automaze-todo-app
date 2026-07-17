# Automaze Todo — Backend

NestJS REST API with JWT auth, Prisma ORM, PostgreSQL, Redis.

## Setup

```bash
cp .env.example .env   # fill in values
npm install
npx prisma migrate deploy
npm run start:dev
```

## Scripts

```bash
npm run start:dev   # development with hot reload
npm run build       # compile TypeScript
npm run start:prod  # run compiled output

npm run test        # unit tests
npm run test:e2e    # e2e tests (requires .env.test + postgres_test on port 5433)
npm run test:cov    # coverage report
```

## Environment variables

See `.env.example` for all required variables.
