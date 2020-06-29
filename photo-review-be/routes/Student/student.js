const Studentrouter = require('express').Router()
// const jwt = require("../../../services/jwt");

Studentrouter.post("/signup", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require("../../controller/studentcontroller");
    controller.signup(params, res);
});
Studentrouter.post("/login", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require("../../controller/studentcontroller");
    controller.login(params, res);
})
module.exports = Studentrouter;
