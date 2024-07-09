var express = require('express');
var router = express.Router();
let cryptoJS = require('crypto-js');
const crypto = require("crypto");
const connection = require('../lib/conn');

/* Get ALL USERS*/
router.get('/', (req, res) => {

    connection.connect((err) => {
        if (err) throw err;

        let sql = 'SELECT * FROM users WHERE deleted = 0';

        connection.query(sql, (err, result) => {
            if (err) throw err;

            if(result.length){
                result.map(user => {
                    delete user.index
                    delete user.password
                    delete user.deleted
                });
                res.json(result)
            } else {
                res.status(404).json({message: 'No users found'});
            }
        })
    });
});

/* get user with id */

router.get('/:userId', (req, res) => {
    let userID = req.params.userId

    connection.connect((err) => {
        if (err) throw err;

        let sql = `SELECT * FROM users WHERE id = ${userID}`;

        connection.query(sql, (err, result) => {
            if (err) throw err;
            if(result.length){
                result.map(user => {
                    delete user.index
                    delete user.password
                    delete user.deleted
                });
                res.json(result)
            } else {
                res.status(404).json({message: 'No user with specific id found'});
            }
        })
    });
});

/* log in user */

router.post('/login', (req, res) => {

    connection.connect((err) => {
        if (err) throw err;

        let email = req.body.email;
        let password = req.body.password;

        let cryptedPassword = cryptoJS.HmacSHA256(password, process.env.SALT_KEY).toString();

        let sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
        let values = [email, cryptedPassword]

        connection.query(sql, values , (err, result) => {
            if (err) throw err;
            
            if (result.length) {
                result.map(user => {
                    delete user.index
                    delete user.password
                    delete user.deleted
                });
                res.json(result)
            } else {
                res.status(401).json({message: 'Not authorized, no user found'});
            }
        });
    });

});

/* Create new user */

router.post('/add', (req, res) => {
    connection.connect((err) => {
        if (err) throw err;

        let { firstName, lastName, inputEmail, password } = req.body

        let sql = `SELECT * FROM users WHERE email = ?`;
        let values = [inputEmail]

        connection.query(sql, values, (err, result) => {
            if (err) throw err;
            
            if (result.length) {
                res.status(409).json({message:'Email already registerd'})
            } else {
                
                let cryptedPassword = cryptoJS.HmacSHA256(password, process.env.SALT_KEY).toString();

                let query = `INSERT INTO users (id, email, password, firstName, lastName) VALUES (?,?,?,?,?)`;
                let values = [crypto.randomUUID(), inputEmail, cryptedPassword, firstName, lastName]

                connection.query(query, values, (err, result) =>{
                    if (err) throw err;

                    console.log(result)
                    res.json(result)
                })
            }
        });

    });

});

/* Delete user */

router.delete('/delete/:userId', (req, res) => {
    let userID = req.params.userId
    connection.connect((err) => {
        if (err) throw err;

        let sql = `UPDATE users SET deleted = 1 WHERE id = ?`;
        let values = [userID]

        connection.query(sql, values, (err, result) => {
            if (err) throw err;
            res.json(result)
         
        })
    });

});




module.exports = router;
