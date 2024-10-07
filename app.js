const express = require("express");
const root = require('./routes/user.routes')
const {sequelize} = require('./db/sequielize')

// sequelize.sync({force: true}).then(_ => console.log('Mande...')).catch(err => console.log(err))
const app = express();
const PORT = 3000

/**
 * 
 * user - login - password -demande acte - valiation(Administrator)-payement 
 *  table: admin
 *          user(n copy) - citizens 
 *          demande 
 *          
 */

app.use(express.json());
// app.use(auth)

root.createUser(app);
root.readUserInfo(app);
root.updateUser(app);
root.deleteUser(app);
require('./routes/login.routes')(app)

// app.get("/", (req, res) => {
app.listen(PORT, () => console.log("Running..."));
