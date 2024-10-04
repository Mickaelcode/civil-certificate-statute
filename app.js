const express = require("express");
const { sequelize } = require("./db/sequielize");

// const user = require("./db/models");
const root = require('./routes/user.routes')

const app = express();
const PORT = 3000

// sequelize.sequelize.authenticate().then(_ => console.log('cool')
// ).catch(err => console.error('error: ' + err.message))

app.use(express.json());

root.createUser(app);
root.readUserInfo(app);
root.updateUser(app);
root.deleteUser(app);

// app.get("/", (req, res) => {
app.listen(PORT, () => console.log("Running..."));
