import * as dotenv from 'dotenv';
dotenv.config();

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infra/database/prisma.service';

const TEST_EMAIL = `e2e-${crypto.randomUUID()}@test.com`;
const TEST_PASSWORD = 'supersecretpassword';

describe('App (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;
  let cookie: string;
  let taskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    await app.init();

    prisma = moduleFixture.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: TEST_EMAIL } });
    await app.close();
  });

  // ─── Auth ────────────────────────────────────────────────────────────────────

  describe('Auth', () => {
    describe('POST /auth/register', () => {
      it('201 — creates user and returns accessToken', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/register')
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
          .expect(201);

        expect(res.body.accessToken).toBeDefined();
        expect(res.body.user.email).toBe(TEST_EMAIL);
        expect(res.headers['set-cookie']).toBeDefined();
      });

      it('409 — duplicate email', async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
          .expect(409);
      });

      it('400 — invalid email', async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send({ email: 'not-an-email', password: TEST_PASSWORD })
          .expect(400);
      });

      it('400 — password too short', async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send({ email: 'other@test.com', password: 'short' })
          .expect(400);
      });
    });

    describe('POST /auth/login', () => {
      it('201 — returns accessToken and sets cookie', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: TEST_EMAIL, password: TEST_PASSWORD })
          .expect(201);

        accessToken = res.body.accessToken;
        cookie = res.headers['set-cookie'][0];

        expect(accessToken).toBeDefined();
        expect(cookie).toContain('refreshToken');
      });

      it('400 — wrong password', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: TEST_EMAIL, password: 'wrongpassword123' })
          .expect(400);
      });

      it('400 — unknown email', async () => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: 'nobody@test.com', password: TEST_PASSWORD })
          .expect(400);
      });
    });

    describe('GET /auth/me', () => {
      it('200 — returns current user', async () => {
        const res = await request(app.getHttpServer())
          .get('/auth/me')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(res.body.email).toBe(TEST_EMAIL);
      });

      it('401 — no token', async () => {
        await request(app.getHttpServer())
          .get('/auth/me')
          .expect(401);
      });
    });

    describe('POST /auth/refresh', () => {
      it('201 — returns new accessToken', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/refresh')
          .set('Cookie', cookie)
          .expect(201);

        expect(res.body.accessToken).toBeDefined();
        accessToken = res.body.accessToken;
        cookie = res.headers['set-cookie'][0];
      });

      it('401 — no cookie', async () => {
        await request(app.getHttpServer())
          .post('/auth/refresh')
          .expect(401);
      });
    });
  });

  // ─── Tasks ───────────────────────────────────────────────────────────────────

  describe('Tasks', () => {
    describe('POST /tasks', () => {
      it('201 — creates task', async () => {
        const res = await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ title: 'Buy groceries', priority: 5 })
          .expect(201);

        taskId = res.body.id;

        expect(res.body.title).toBe('Buy groceries');
        expect(res.body.priority).toBe(5);
        expect(res.body.completed).toBe(false);
      });

      it('400 — missing title', async () => {
        await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ priority: 5 })
          .expect(400);
      });

      it('400 — priority out of range', async () => {
        await request(app.getHttpServer())
          .post('/tasks')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ title: 'Test', priority: 11 })
          .expect(400);
      });

      it('401 — no token', async () => {
        await request(app.getHttpServer())
          .post('/tasks')
          .send({ title: 'Test', priority: 5 })
          .expect(401);
      });
    });

    describe('GET /tasks', () => {
      it('200 — returns task list', async () => {
        const res = await request(app.getHttpServer())
          .get('/tasks')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });

      it('200 — filters by completion=done returns empty', async () => {
        const res = await request(app.getHttpServer())
          .get('/tasks?completion=done')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(res.body.every((t: { completed: boolean }) => t.completed === true)).toBe(true);
      });

      it('200 — filters by title', async () => {
        const res = await request(app.getHttpServer())
          .get('/tasks?title=groceries')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(res.body.some((t: { title: string }) => t.title === 'Buy groceries')).toBe(true);
      });

      it('401 — no token', async () => {
        await request(app.getHttpServer())
          .get('/tasks')
          .expect(401);
      });
    });

    describe('GET /tasks/:id', () => {
      it('200 — returns task', async () => {
        const res = await request(app.getHttpServer())
          .get(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(200);

        expect(res.body.id).toBe(taskId);
      });

      it('404 — unknown id', async () => {
        await request(app.getHttpServer())
          .get('/tasks/non-existent-id')
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(404);
      });
    });

    describe('PATCH /tasks/:id', () => {
      it('200 — updates task', async () => {
        const res = await request(app.getHttpServer())
          .patch(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ completed: true, title: 'Buy groceries updated' })
          .expect(200);

        expect(res.body.completed).toBe(true);
        expect(res.body.title).toBe('Buy groceries updated');
      });

      it('404 — unknown id', async () => {
        await request(app.getHttpServer())
          .patch('/tasks/non-existent-id')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ title: 'x' })
          .expect(404);
      });
    });

    describe('DELETE /tasks/:id', () => {
      it('204 — deletes task', async () => {
        await request(app.getHttpServer())
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(204);
      });

      it('404 — already deleted', async () => {
        await request(app.getHttpServer())
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${accessToken}`)
          .expect(404);
      });
    });

    describe('POST /auth/logout', () => {
      it('204 — clears cookie', async () => {
        await request(app.getHttpServer())
          .post('/auth/logout')
          .set('Cookie', cookie)
          .expect(204);
      });
    });
  });
});
