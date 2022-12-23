import { PrismaClient, User } from "@prisma/client";

import { UserDto } from "../../domain/dtos/user";

const prisma = new PrismaClient();

export class UpdateUserUseCase{
    constructor() {}

    async handle(user: Omit<Omit<UserDto, "password">, "salt">): Promise<User>{
        const upUser = await prisma.user.update({
            data: {
                name: user.name,
                email: user.email
            }, where: {
                id: user.id
            }
        })

        return upUser;
    }
}