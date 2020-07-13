const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const AccountController = () => { };
AccountController.login = (params, res) => {
    client.query(`select * from account where email=$1 and password=$2`, [params.email, params.password],
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

}
AccountController.signup = (params, res) => {
    client.query(`insert into account(name,email,password) values($1,$2,$3) RETURNING *`,
        [params.name, params.email, params.password], (err, results) => {
            if (err) console.log(err);
            else {
                console.log("user data entered successfully");
                res.send({ success: true })
            }
        })

}
AccountController.getusers = (params, res) => {
    client.query(`select * from account`, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rowCount !== 0) {
                res.send({ success: true, data: results.rows })
            }
        }
    })

}

module.exports = AccountController;