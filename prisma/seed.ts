import { PrismaClient } from "@prisma/client";
import { movies } from "./data/movies";


const prisma = new PrismaClient();

const main = async (): Promise<void> => {
    try {
        await prisma.movie.createMany({
            data: movies
        })
        
        
    } catch (error) {
        console.log(error)
    }
}

main();