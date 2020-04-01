const 
{ 
    createuser,
    getuserbyId,
    getusers,
    updateuser,
    deleteuser,
    login
} 
= require("./users.controller");
const router = require("express").Router();
const {checktoken } = require("../../auth/token_validation");

router.post("/create",checktoken, createuser);
router.get("/getall",checktoken, getusers);
router.get("/getbyid/:id",checktoken,getuserbyId);
router.patch("/update",checktoken, updateuser);
router.delete("/delete",checktoken, deleteuser);
router.post("/login",login);

module.exports = router;