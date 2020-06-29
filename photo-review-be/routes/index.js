const client = require('../config/database')
const jwt = require('jsonwebtoken')
var multer = require('multer');
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
        console.log(req.body);
        const data = req.body;
        client.query(`select * from account where email=$1 and password=$2`, [data.email, data.password],
            (err, results) => {
                if (err) console.log(err);
                else {
                    console.log('access successful')
                    // console.log(results.rows[0])
                    let token = jwt.sign({ data: results.rows[0], exp: Math.floor(Date.now() / 100) + 600 * 600 },
                        "secret")
                    // console.log(token);
                    res.send({ success: true, token, data: results.rows[0] })
                }

            })
    })
    app.post("/signup", (req, res) => {
        const data = req.body;
        client.query(`insert into account(name,email,password) values($1,$2,$3) RETURNING *`,
            [data.name, data.email, data.password], (err, results) => {
                if (err) console.log(err);
                else {
                    console.log("user data entered successfully");
                    res.send({ success: true })
                }
            })

    })
    app.get('/getusers', (req, res) => {
        client.query(`select * from account`, (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.post('/imageupload', upload.single('image'), (req, res) => {
        const data = req.body;
        const name = req.file.filename;
        const str = `http://localhost:5003/images/${name}`;
        // console.log('69', str, data.description, data.owner, data.sharedid);
        client.query(`insert into Image(image,description,owner,shared) values($1,$2,$3,$4) RETURNING *`, [str, data.description, data.owner, data.sharedid],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true });
                    }
                }
            })

    })
}

module.exports = route;