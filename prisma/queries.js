const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// async function createUser(username,firstName,lastName,password) {
//     await prisma.user.create({
//         data: {
//             username: username,
//             first_name:firstName,
//             last_name:lastName,
//             password: password
//         }})
//     return 
// }
//users
async function findAllUsers() {
    const posts = await prisma.user.findMany({
        include: {
            posts: true,
        }
    })
    return posts
}

async function findUser(id) {
    const user = await prisma.user.findUnique({
        include: {
            posts: true,
        },
        where: {
          id: id,
        },
    })
    return user
}

async function createUser(first_name,last_name,username,password) {
    await prisma.user.create({
        data: {
            first_name,
            last_name,
            username,
            password,
        }})
    return 
}
//posts
async function findAllPosts() {
    const posts = await prisma.post.findMany({
        include: {
            comments: true,
        }
    })
    return posts
}

async function createPost(title,text) {
    await prisma.post.create({
        data: {
            title,
            text,
            userId:1
        }})
    return 
}


module.exports = {
    findAllPosts,
    createPost,
    createUser,
    findAllUsers,
    findUser
}