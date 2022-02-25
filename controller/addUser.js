const connection = require('../config/db.js');

//@desc     get all users
//@route    GET  /
//@access   Private
const allUsers = async (req,res) =>{
    let q1 = "SELECT * FROM tblusers"
    connection.query(q1,(err,result)=>{
        if(!err){
            res.send(result);
        }
        else {
            throw new Error(err);
        }
    })
}

module.exports = {allUsers}