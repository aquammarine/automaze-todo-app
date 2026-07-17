# Automaze Todo App

Fullstack todo application. NestJS backend, React frontend.

**Stack:** NestJS · Prisma · PostgreSQL · Redis · React · TanStack Router · React Query · Zustand · Tailwind CSS

---

## Prerequisites

- Node.js 22+
- Docker + Docker Compose

---

## Local development

### With Docker (recommended)

1. Copy env files:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Fill in `backend/.env`:

```
JWT_SECRET=        # any random string
JWT_REFRESH_SECRET=  # any random string
```

3. Start all services:

```bash
docker compose -f docker-compose.dev.yml up
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API docs: http://localhost:3000/api/docs

---

### Without Docker

Start PostgreSQL and Redis locally, then:

```bash
# Backend
cd backend
cp .env.example .env   # fill in values
npm install
npx prisma migrate deploy
npm run start:dev

# Frontend (separate terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## Running tests

```bash
cd backend

# Unit tests
npm run test

# E2e tests (requires postgres_test container on port 5433)
docker compose -f ../docker-compose.dev.yml up postgres_test -d
cp .env.test.example .env.test   # fill in values if needed
npm run test:e2e
```

---

## Production deploy (Render + Vercel)

### Backend (Render Web Service)

1. Create a **PostgreSQL** database on Render — copy the connection string
2. Create a **Key Value** (Redis) instance on Render — copy the connection string
3. Create a **Web Service**, connect your repo, set root directory to `backend`, select Docker runtime
4. Set environment variables:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Render Postgres connection string |
| `REDIS_URL` | Render Redis connection string |
| `JWT_SECRET` | Random string (min 64 chars) |
| `JWT_REFRESH_SECRET` | Random string (min 64 chars) |
| `CLIENT_URL` | Your Vercel frontend URL |
| `NODE_ENV` | `production` |
| `SWAGGER_USER` | Username to protect `/api/docs` |
| `SWAGGER_PASSWORD` | Password to protect `/api/docs` |

### Frontend (Vercel)

1. Import repo, set root directory to `frontend`
2. Set environment variable:

| Variable | Value |
|---|---|
| `VITE_API_URL` | Your Render backend URL |

### Deploy order

1. Deploy backend → get backend URL
2. Deploy frontend with `VITE_API_URL` set → get frontend URL
3. Set `CLIENT_URL` in Render backend env to the frontend URL → redeploy backend
