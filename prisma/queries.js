const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


async function findAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            posts: true,
        }
    })
    return users
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

async function findUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: {
          username,
        },
    })
    return user
}
async function createUser(first_name,last_name,username,password,author) {
    await prisma.user.create({
        data: {
            first_name,
            last_name,
            username,
            password,
            author
        }})
    const users = await prisma.user.findMany({
        include: {
            posts: true,
        }
    })
    return 
}
async function deleteAllUsers() {
    await prisma.user.deleteMany()
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
async function deleteAllPosts() {
    await prisma.post.deleteMany()
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
async function findComment(id,postId) {
    const comment = await prisma.comment.findUnique({
        where: {
          id,
          postId
        },
    })
    return comment
}

async function udpateComment(text,id) {
    await prisma.comment.update({
        where: {
            id,
        },
        data: {
            text,
        }
      })
    return
}
async function deleteComment(id) {
    await prisma.comment.delete({
       where: {
         id,
       },
   })
}
async function deleteAllComments () {
    await prisma.comment.deleteMany()
}
module.exports = {
    findAllPosts,
    createPost,
    createUser,
    findAllUsers,
    findUser,
    findUserByUsername,
    deleteAllUsers,
    findPost,
    udpatePost,
    deletePost,
    deleteAllPosts,
    findAllComments,
    createComment,
    findComment,
    udpateComment,
    deleteComment,
    deleteAllComments
}