require("./db-folder/mongoose");
const express = require("express");
const userRoute = require("./routers/user");
const taskRoute = require("./routers/task");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRoute);
app.use(taskRoute);
app.listen(port, () => {
  console.log("Connection done" + port);
});
