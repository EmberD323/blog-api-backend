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

async function createPost(title,text,publish,userId) {
    await prisma.post.create({
        data: {
            title,
            text,
            published:publish,
            userId:userId
        }})
    return 
}
async function findPost(id) {
    const post = await prisma.post.findUnique({
        include: {
            comments: true,
          },
        where: {
          id
        },
    })
    return post
}
async function udpatePost(title,text,publish,id) {
    await prisma.post.update({
        where: {
            id,
        },
        data: {
            title,
            text,
            published:publish
        }
      })
    return
}

async function deletePost(id) {
    await prisma.post.delete({
       where: {
         id,
       },
   })
}
//comments
async function findAllComments(postid) {
    const comments = await prisma.comment.findMany({
        where: {
          postId:postid
        },
    })
    return comments
}
async function createComment(text,postid,userid) {
    await prisma.comment.create({
        data: {
            text,
            userId:userid,
            postId:postid
        }})
    return 
}
module.exports = {
    findAllPosts,
    createPost,
    createUser,
    findAllUsers,
    findUser,
    findPost,
    udpatePost,
    deletePost,
    findAllComments,
    createComment
}