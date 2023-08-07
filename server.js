const express = require("express");
const app = express();
const employeeRouter = require("./router/employeeRoutes");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employee", employeeRouter);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is runing on port ${PORT}`);
});
