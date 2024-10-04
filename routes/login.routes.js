/**
 * login for the user
 */
const bcrypt = require("bcrypt");
const User = require("../db/models");
const jwt = require("jsonwebtoken");
const private_key = require("../auth/private_key")
module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        console.log(user.email);

        if (!user) return res.status(200).json({ message: "user not found" });
        else {
          bcrypt
            .compare(req.body.password, user.password)
            .then((isValidPassWord) => {
              console.log(isValidPassWord);

              if (!isValidPassWord)
                return res.status(200).json({ message: "invalid password" });
              const token = jwt.sign({ id: user.id }, private_key, {
                expiresIn: "24h",
              });
              return res
                .status(200)
                .json({ message: "login successful", user ,token});
            });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: "error server in login", error })
      );
  });
};
