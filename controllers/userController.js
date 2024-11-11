const db = require("../prisma/queries.js");

async function newUserCreate (req, res) {
    //validate form - wait until user
    const {first_name,last_name,username,password,passwordConfirm} = req.body
    await db.createUser(first_name,last_name,username,password)
    const users = await db.findAllUsers();
    console.log(users)
}


module.exports = {
    newUserCreate,
};