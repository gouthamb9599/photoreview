const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const GroupController = () => { };
GroupController.create = (params, res) => {
    client.query(`insert into groups(name) values($1) RETURNING id`, [params.groupname],
        (err, results) => {
            if (err) console.log(err);
            else {
                if (results.rowCount !== 0) {
                    const usersarray = params.users;
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
}
GroupController.getgroup = (params, res) => {
    client.query(`select * from members where userid=$1`, [params], (err, results) => {
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
}

module.exports = GroupController;