require("dotenv").config();
//express
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
//routes
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});
  