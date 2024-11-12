const db = require("../prisma/queries.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const tools = require("./modules/tools.js");
const { body, validationResult } = require("express-validator");

const validateSignUp= [
    body("first_name").trim()
      .escape()
      .isAlpha().withMessage(`First name can only be letters`)
      .isLength({ min: 1, max: 15 }).withMessage(`First name must be between 1 and 15 characters.`),
    body("last_name").trim()
        .escape()
        .isAlpha().withMessage(`Last name can only be letters`)
        .isLength({ min: 1, max: 15 }).withMessage(`Last name must be between 1 and 15 characters.`),
    body("username")
        .isEmail().withMessage(`Username must be a valid email`)
        .custom(async value => {
      const user = await db.findUserByUsername(value);
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
    body("password")
      .isLength({ min: 8}).withMessage(`Password must be between more than 8 characters.`)
      .matches(/\d/).withMessage('Password must contain a number'),
    body('passwordConfirm').custom((value, { req }) => {
          return value === req.body.password;
      }).withMessage(`Passwords must match.`),
    body("author").isBoolean().withMessage(`Response must be true or false`),
];
newUserCreate = [
    validateSignUp,
    async function(req, res) {
        const {first_name,last_name,username,password,passwordConfirm,author} = req.body
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors.array()
                });
            }
            await db.createUser(tools.capitalize(first_name),tools.capitalize(last_name),username,hashedPassword,Boolean(author));
            res.redirect("/login")
          });
    }
]

async function userGet (req, res) {
    //mock user - after authentication - when you get the 
  
}

module.exports = {
    newUserCreate,
    userGet
};