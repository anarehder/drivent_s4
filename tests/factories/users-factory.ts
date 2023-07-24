import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

export function userForUnit(): User {
  const user = {
    id: 1,
    email: faker.internet.email(),
    password: faker.internet.password(6),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return user;
}
