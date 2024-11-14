const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
    //await prisma.comment.deleteMany()
    //await prisma.post.deleteMany()
    //await prisma.user.deleteMany()
//     await prisma.user.deleteMany({
//       where: {
//           id:13,
//       }
//   })
//   const users = await prisma.user.findMany({
//     include: {
//         posts: true,
//     }
// })
// console.log(users) 
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })