const express    = require("express"),
      router     = express.Router({mergeParams : true}),
      crypto     = require('crypto'),
      nodeMailer = require("nodemailer"),
	  dotenv     = require('dotenv'),
	  User       = require("../models/user"),
	  middleware = require("../middleware"),
	  passport   = require("passport");

dotenv.config();

//Register Routes
//------------------------Google auth implementation----------------------



//Logout Route
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

router.delete('/delete-user/:userId', (req, res) => {
	User.findByIdAndRemove(req.params.userId, function(err){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong!!!");
            res.redirect('back');
        } else {
                req.flash("success", "Your account is DELETED!!!");
                res.redirect('/');
        }
    })
});

//------------------------------------Forgot password routes-----------------------------


module.exports = router;