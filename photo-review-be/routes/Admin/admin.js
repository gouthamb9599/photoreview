const Adminrouter = require('express').Router()
// const jwt = require("../../../services/jwt");
Adminrouter.get("/getaccesslist", (req, res) => {
    let controller = require('../../controller/admincontroller');
    controller.accesslist(res);
});
Adminrouter.get("/getassignlist", (req, res) => {
    let controller = require('../../controller/admincontroller');
    controller.assignlist(res);
});
Adminrouter.get("/getsubject", (req, res) => {
    let controller = require('../../controller/admincontroller');
    controller.subjects(res);
});
Adminrouter.post("/provideaccess", (req, res) => {
    let params = req.body;
    console.log(params);
    let controller = require('../../controller/admincontroller');
    controller.provideaccess(params, res);
});
Adminrouter.post("/assignsubject", (req, res) => {
    let params = req.body;
    console.log('23', params);
    let controller = require('../../controller/admincontroller');
    controller.assignsubject(params, res);
});
module.exports = Adminrouter;