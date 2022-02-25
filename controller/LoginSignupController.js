const connection = require('../config/db.js');
const generateToken = require('../utils/generateToken.js');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');



// @desc      post login data from login page
// @route     /login
// @access    public

const loginData = async (req,res) =>{
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let q1 = "SELECT userPassword FROM tblusers WHERE userEmail = '"+userEmail+"' ";
    connection.query(q1, async function(err,result){

        if(!err){

            var databasePassword = result[0].userPassword;
            console.log(databasePassword);
            const comparePassword = await bcrypt.compare(userPassword,databasePassword );

            if(comparePassword)
            {
                let gToken = generateToken(userEmail);
                res.cookie('jwt_Token',gToken,{httpOnly:true})
                // console.log(res.cookie('jwt_Token'));
                res.send(gToken);
                console.log(result);
                
            }  
            else{
                res.send('Wrong password');
            } 
        }
        else {
            throw new Error(err);
            
        }
    })
}



// @desc      login page
// @route     /login
// @access    public

const login = async (req,res) =>{
    res.send('hello');
}


// @desc      logout page
// @route     /logout
// @access    public

const logout = async (req,res) =>{
    console.log(res.cookie('jwt_Token'));
    res.clearCookie('jwt_Token');
    console.log(res.cookie('jwt_Token'));    
    res.redirect('/login');
}

module.exports ={
    loginData,
    logout,
    login,
    
}