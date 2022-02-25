const connection = require('../config/db.js');
const generateToken = require('../utils/generateToken.js');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


// @desc      Admin registration
// @route     /admin/register
// @access    public

const registrationOfAdmin = async (req,res) =>{
    let userName = req.body.userName;
    let userFullName = req.body.userFullname;
    let userAddress = req.body.userAddress;
    let userPhoneNo = req.body.userPhoneNo;
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;
    let userCreated = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    let Role = 'Admin';

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
        const salt = await bcrypt.genSalt();
        userPassword = await bcrypt.hash(userPassword, salt);
    
        let q1 = "INSERT INTO tblusers (userName ,userFullName ,userAddress ,userPhoneNo ,userEmail ,userPassword, Role,userCreated) VALUES ('"+userName+"','"+userFullName+"','"+userAddress+"' ,'"+userPhoneNo+"','"+userEmail+"','"+userPassword+"','"+Role+"','"+userCreated+"' )";
        connection.query(q1,(err,result)=>{
            if(!err){
                let gToken = generateToken(userEmail);
                res.cookie('jwt_Token',gToken,{httpOnly:true})
                res.send(result);
                console.log('register successfully    :', gToken); 
                console.log('password:  ', userPassword ); 
            }
            else {
                if(err.sqlMessage.includes('Duplicate entry')) {
                    res.status(404).json({err, message: 'email already exists'});
                }
                throw new Error(err.sqlMessage);
            }
        })
}

module.exports = {registrationOfAdmin}