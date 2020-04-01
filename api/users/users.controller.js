const {
  create,
  getusers,
  getuserbyId,
  updateuser,
  deleteuser,
  getuserbyemail
} = require("./users.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createuser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: err.message
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getuserbyId: (req, res) => {
    const id = req.params.id;
    getuserbyId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getusers: (req, res) => {
    getusers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateuser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateuser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteuser: (req, res) => {
    const data = req.body;
    deleteuser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getuserbyemail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User or Email Not Found"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ results: result }, "qwe1234", {
            expiresIn: "1h"
        });
        return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
        });
      }
      else{
          return res.json({
            success : 0,
            data : "email or password Invalid"
          });
      }
    });
  }
};
