var express = require('express');
var router = express.Router();
const connection = require('../lib/conn')


/* Get ALL USERS*/

router.get('/', (req, res) => {

    connection.connect((err) => {
        if (err) throw err;

        let sql = 'SELECT * FROM users';

        connection.query(sql, (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
    });
});

/* get users with id */

router.get('/', (req, res) => {

    connection.connect((err) => {
        if (err) throw err;

        let sql = 'SELECT * FROM users';

        connection.query(sql, (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
    });
});


/* get userId stored items*/

router.get('/items/:userId', (req, res) => {


});


/* log in user */

router.post('/login', (req, res) => {

});

/* Create new user */

router.post('/add', (req, res) => {

});

/* Delete user */

router.delete('/delete/userId', (req, res) => {

})
module.exports = router;
