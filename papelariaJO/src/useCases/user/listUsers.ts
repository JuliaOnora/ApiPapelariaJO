import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class ListUsersUseCase{
    constructor() {}

    async handle(): Promise<User[]>{
        const listUser = await prisma.user.findMany();

        return listUser;
    }
}