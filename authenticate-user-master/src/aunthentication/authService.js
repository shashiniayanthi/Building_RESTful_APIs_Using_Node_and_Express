//import jsonwebtoken and config file
const jwt = require('jsonwebtoken')
const config = require('../../config')

//This function will verify email and password and will return true and false

function verifyUser({email,password},userData){
   if(userData===undefined){
  return false
   }
   else {

     if(email === userData.email && password === userData)
     return true;
   }
    
  
}

//This function will create JWT token and return the token
// use the method jwt.sign having two parameters payload and Auth_Secret
function createJWT(userData) {
  //create payload
   const payload = {
    role :"USER",
    email : userData.email ,
    name : userData.name
   }

    const Token = jwt.sign(payload,config.AUTH_SECRET,{
      expiresIn :3600,
    });

    return Token;
  }


  module.exports={
    verifyUser,createJWT
  }