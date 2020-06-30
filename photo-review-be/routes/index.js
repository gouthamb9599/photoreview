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
        // console.log(req);
        const name = req.file.filename;
        const str = `http://localhost:5000/images/${name}`;
        // console.log('69', str, data.description, data.owner, data.sharedid);
        client.query(`insert into Image(image,description,owner,shared,review) values($1,$2,$3,$4,$5) RETURNING *`, [str, data.description, data.owner, data.sharedid, data.review],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true });
                    }
                }
            })
    })
    app.post('/creategroup', (req, res) => {
        // console.log(req.body);
        const data = req.body
        client.query(`insert into groups(name) values($1) RETURNING id`, [data.groupname],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        const usersarray = data.users;
                        for (var counter = 0; counter < usersarray.length; counter++) {
                            client.query(`insert into members(groupid,userid) values($1,$2) RETURNING *`, [results.rows[0].id, usersarray[counter]],
                                (err, results) => {
                                    if (err) console.log(err);
                                    else {
                                        res.send({ success: true })
                                        // console.log(results, counter);
                                        // counter = counter + 1;
                                    }
                                })
                        }

                    }
                }

            })
    })
    app.get('/getgroups', (req, res) => {
        const id = req.query.userid;
        console.log('12', id);
        client.query(`select * from members where userid=$1`, [id], (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    client.query(`select * from groups where id=$1 `, [results.rows[0].groupid],
                        (err, result) => {
                            if (err) console.log(err);
                            else {
                                // console.log(result);
                                res.send({ success: true, data: result.rows })
                            }
                        });
                }
            }
        })
    })
    app.get('/getuploads', (req, res) => {
        const id = req.query.userid;
        client.query(`select * from  image where owner=$1`, [id], (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }
        })
    })
    app.get('/getshareduserimages', (req, res) => {
        const id = req.query.id;
        client.query(`select * from image where shared=$1`, [id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }

            })
    })
    app.get('/getsharedgroupimages', (req, res) => {
        const id = req.query.id;
        client.query(`select * from image where shared=$1`, [id],
            (err, results) => {
                if (err) console.log(err);
                else {
                    // console.log(results);
                    if (results.rowCount !== 0) {
                        res.send({ success: true, data: results.rows })
                    }
                }

            })
    })
}

module.exports = route;