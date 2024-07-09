var express = require('express');
var router = express.Router();
const connection = require('../lib/conn')

/* move to another route?*/
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
