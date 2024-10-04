const express = require("express");
const root = require('./routes/user.routes')
const auth = require('./auth/auth')

const app = express();
const PORT = 3000



app.use(express.json());
// app.use(auth)

root.createUser(app);
root.readUserInfo(app);
root.updateUser(app);
root.deleteUser(app);
require('./routes/login.routes')(app)

// app.get("/", (req, res) => {
app.listen(PORT, () => console.log("Running..."));
