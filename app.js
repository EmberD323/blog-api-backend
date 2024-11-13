require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors())

app.use(express.urlencoded({ extended: true }));

//routes
const indexRouter = require("./routes/indexRouter");
const postRouter = require("./routes/postRouter");

app.use("/", indexRouter);
app.use("/posts", postRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
//errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

  