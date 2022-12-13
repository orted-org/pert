import { PrismaClient } from "@prisma/client";
import { bool } from "aws-sdk/clients/signer";
import ETodo from "../entities/todo";
export default class TodoManager {
  private store: PrismaClient;
  constructor(store: PrismaClient) {
    this.store = store;
  }

  async Create(title: string): Promise<ETodo> {
    return this.store.todos.create({
      data: { title },
    });
  }

  GetByID(id: number): Promise<ETodo | null> {
    return this.store.todos.findUnique({ where: { id: id } });
  }

  GetMany(limit: number = 10, offset: number = 0): Promise<ETodo[]> {
    return this.store.todos.findMany({
      take: limit,
      skip: offset,
    });
  }

  async Update(
    id: number,
    title?: string,
    description?: string,
    is_completed?: bool
  ): Promise<ETodo> {
    try {
      return this.store.todos.update({
        where: { id },
        data: {
          title,
          description,
          is_completed,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async DeleteById(id: number) {
    try {
      await this.store.todos.delete({ where: { id } });
      return;
    } catch (err) {
      throw err;
    }
  }
}
