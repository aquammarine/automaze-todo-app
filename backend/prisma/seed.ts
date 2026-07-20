import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: hashedPassword,
      tasks: {
        create: [
          {
            title: 'Set up project structure',
            description: 'Initialize repo, install dependencies, configure linting',
            priority: 1,
            completed: true,
          },
          {
            title: 'Design database schema',
            description: 'Define models and relations in Prisma schema',
            priority: 2,
            completed: true,
          },
          {
            title: 'Implement authentication',
            description: 'JWT login and registration endpoints',
            priority: 1,
            completed: false,
            dueDate: new Date('2026-07-25'),
          },
          {
            title: 'Write unit tests',
            priority: 3,
            completed: false,
            dueDate: new Date('2026-07-30'),
          },
        ],
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: hashedPassword,
      tasks: {
        create: [
          {
            title: 'Review pull requests',
            description: 'Review open PRs from team members',
            priority: 2,
            completed: false,
            dueDate: new Date('2026-07-22'),
          },
          {
            title: 'Fix login bug',
            description: 'Token not refreshing on expiry',
            priority: 1,
            completed: true,
          },
          {
            title: 'Update API documentation',
            priority: 3,
            completed: false,
          },
        ],
      },
    },
  });

  console.log(`Created user: ${alice.email}`);
  console.log(`Created user: ${bob.email}`);
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
