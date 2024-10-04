const User = require("../db/models"); // Assuming the correct path to your model
const { ValidationError } = require("sequelize");
const bcrypt = require("bcrypt");
const auth = require("../auth/auth");

const jwt = require('jsonwebtoken')
const private_key = require('../auth/private_key')

/**
 * Create user route
 */
const createUser = (app) => {
  app.post("/api/user",auth,(req, res) => {
    try {
      const { email, password } = req.body;
      bcrypt
        .hash(password, 10)
        .then((password) => {
          User.create({ email, password })
            .then((user) => {
              return res.json(`created, ${user.email}`); // Return ensures no further response is sent
            })
            .catch((err) => {
              if (err instanceof ValidationError) {
                return res.status(400).json(err.message);
              }
              // Return ensures only one response for other errors
              return res.status(500).json({ error: "Internal Server Error" });
            });
        })
        .catch((err) => res.status(404).json({ error: err.message }));
    } catch (err) {
      console.error(err);
      // Return a 500 error for any unhandled exceptions
      return res.status(500).send("Server Error");
    }
  });
};

/**
 * Read user information
 */

const readUserInfo = (app) => {
  app.get("/api/user",auth, (req, res) => {
    User.findAll()
      .then((user) => {
        // console.log('may',auth);
        console.log(user == 0);

        if (!user) {
          return res.status(404).json("User not found");
        } else if (user == 0) return res.status(200).json("Empty User");
        return res.json(user);
      })
      .catch((err) => {
        console.error(err.message);
        return res.status(500).json("Server Error");
      });
  });
};

/**
 *  update a user
 */

const updateUser = (app) => {
  app.put("/api/user/:id",auth, (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    User.update({ email, password }, { where: { id } })
      .then((updated) => {
        if (!updated) {
          return res.status(404).json("User not found");
        }
        return res.json(`User updated, ${email}`);
      })
      .catch((err) => {
        console.error(err.message);
        return res.status(500).json("Server Error");
      });
  });
};

/**
 * delete a user
 */

const deleteUser = (app) => {
  app.delete("/api/user/:id", auth,(req, res) => {
    const { id } = req.params;

    User.destroy({ where: { id } })
      .then((deleted) => {
        if (!deleted) {
          return res.status(404).json("User not found");
        }
        return res.json(`User deleted, ID: ${id}`);
      })
      .catch((err) => {
        console.error(err.message);
        return res.status(500).json("Server Error");
      });
  });
};
module.exports = { createUser, readUserInfo, updateUser, deleteUser };
