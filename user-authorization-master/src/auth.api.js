const express = require('express');
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

// redirects the login to consent authorization screen from github
router.get('/login', (req, res) => {
        res.redirect('https://github.com/login/oauth/authorize?client_id'+config.CLIENT_ID)
});


// Callback url to which github oauth code is sent 
router.get('/callback', (req, res) => {
        // Return the token in cookie
        // Data should be sent either in cookie or in session storage
        try {
                oauthCtrl.oauthProcessor(req.query.code,(err,data) => {
                        if(err){
                                res.status(401).send({err:"Bad Request"})
                        }
                        else{
                                res.redirect('/welcome.html?token'+data)
                        }
                })
        } catch (error) {
               
        }
       
});

// router.get('/callback', async (req, res) => {
//         try {
//             const token = await getAccessToken(req.query.code);
//             // Redirect to welcome page with token parameter
//             res.redirect('/welcome.html?token=' + token);
//         } catch (error) {
//             console.error("Error processing OAuth:", error);
//             res.status(401).send({ err: "Bad Request" });
//         }
//     });
    

module.exports = router;