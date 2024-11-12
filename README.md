# blog-api-backend
To build a backend for two different front-ends for accessing and editing blog posts


## Features

- User authentication with JWT


## Tech Stack

- **Backend**: Express.js
- **Database**: PostgreSQL with Prisma ORM, stored on railway
- **Authentication**: JWT
- **Session Management**: express-session with @quixo3/prisma-session-store
- **Password Hashing**: bcryptjs

dotenv process.env.NODE_ENV
express
express validator const { body, validationResult } = require("express-validator");
PostgreSQL
bcryptjs
prisma
jwt
passport-jwt
\c
steps:
figure out jwt sign up and log in
use token for edit posts, create posts,delete posts