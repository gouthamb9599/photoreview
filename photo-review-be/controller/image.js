const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const ImageController = () => { };
ImageController.uploadd = (params, name, res) => {
    const str = `http://localhost:5000/images/${name}`;
    client.query(`insert into Image(image,description,owner,shared,review) values($1,$2,$3,$4,$5) RETURNING *`, [str, params.description, params.owner, params.sharedid, params.review],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true });
                }
            }
        })

}
ImageController.getupload = (params, res) => {
    client.query(`select * from  image where owner=$1`, [params], (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                res.send({ success: true, data: results.rows })
            }
        }
    })
}
ImageController.usershare = (params, res) => {
    client.query(`select * from image where shared=$1`, [params],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }

        })
}
ImageController.groupshare = (params, res) => {
    client.query(`select * from image where shared=$1`, [params],
        (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results);
                if (results.rowCount !== 0) {
                    res.send({ success: true, data: results.rows })
                }
            }

        })
}
ImageController.review = (params, res) => {
    client.query(`insert into review(review,image_id,user_id)`, [params.review, params.image, params.user],
        (err, results) => {
            if (err) console.log(err);
            else {
                // console.log(results);
                if (results.rowCount !== 0) {
                    res.send({ success: true })
                }
            }
        }
    )
}

module.exports = ImageController;