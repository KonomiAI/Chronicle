import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  async getTest(): Promise<any> {
    await prisma.$connect()
    const allUsers = await prisma.post.findMany();
    await prisma.$disconnect()
    return allUsers;
  }

  async getTest2(): Promise<any> {
    await prisma.$connect()
    await prisma.post.create({
      data: {
        slug: 'test',
        title: 'test',
        body: 'test',
      }
    });
    const allUsers = await prisma.post.findMany();
    await prisma.$disconnect()
    return allUsers;
  }
}
