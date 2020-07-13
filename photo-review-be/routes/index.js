const client = require('../config/database')
const jwt = require('jsonwebtoken')
var multer = require('multer');
const imageToBase64 = require('image-to-base64');
const route = app => {
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "images");
        },
        filename(req, file, cb) {
            // console.log("HII", this.filename);
            var type = file.mimetype.replace("image/", "");
            cb(null, `${file.fieldname}-${Date.now()}.${type}`);
        }
    });
    var upload = multer({ storage: storage });
    // app.post('/api/file', function (req, res) {
    //     var upload = multer({ storage: storage }).single('userFile');
    //     upload(req, res, function (err) {
    //         if (err) {
    //             return res.end("Error uploading file.");
    //         }
    //         res.end("File is uploaded");
    //     });
    // });
    app.post('/login', (req, res) => {
        // console.log(req.body);
        const params = req.body;
        const controller = require('../controller/account.js')
        controller.login(params, res);

    })
    app.post("/signup", (req, res) => {
        const params = req.body;
        const controller = require('../controller/account.js')
        controller.signup(params, res);


    })
    app.get('/getusers', (req, res) => {
        const controller = require('../controller/account.js')
        controller.getusers(res);

    })

    app.post('/imageupload', upload.single('image'), (req, res) => {
        const params = req.body;
        const name = req.file.filename;
        const controller = require('../controller/image.js');
        controller.uploadd(params, name, res);

    })
    app.post('/creategroup', (req, res) => {
        const params = req.body
        const controller = require('../controller/groups.js');
        controller.create(params, res);

    })
    app.get('/getgroups', (req, res) => {
        const params = req.query.userid;
        const controller = require('../controller/groups.js');
        controller.getgroup(params, res);

    })
    app.get('/getuploads', (req, res) => {
        const params = req.query.userid;
        const controller = require('../controller/image.js');
        controller.getupload(params, res)
    })
    app.get('/getshareduserimages', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/image.js');
        controller.usershare(params, res);

    })
    app.get('/getsharedgroupimages', (req, res) => {
        const params = req.query.id;
        const controller = require('../controller/image.js');
        controller.groupshare(params, res);
    })
}

module.exports = route;