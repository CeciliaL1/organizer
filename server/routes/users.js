var express = require('express');
var router = express.Router();
const connection = require('../lib/conn')


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

            console.log(result);
            res.json(result);
        })
    });
});



/* log in user */

router.post('/login', (req, res) => {

});

/* Create new user */

router.post('/add', (req, res) => {

});

/* Delete user */

router.delete('/delete/userId', (req, res) => {

});


/* move to another route? */
/* get users storage units with id */

router.get('storageunit/:userId', (req, res) => {
    let userID = req.params.userId;

    connection.connect((err) =>  {
        if (err) throw err;

        let sql = `SELECT * FROM storageunit WHERE userId = ${userID}`;
        
        connection.query(sql, (err, result) => {
            if (err) throw err;

            res.json(result)
        })

    })
})


/* get userId stored items*/

router.get('/items/:userId', (req, res) => {


});

module.exports = router;
