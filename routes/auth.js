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
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", (req, res) => {
	if(req.body.password === req.body.confirm){
		var newUser = new User({username : req.body.email});
		User.register(newUser, req.body.password, function(err, user){
			if(err){
				req.flash("error", err.message);
                console.log(err);
				res.redirect("/register");
			} else {
                req.flash("success", "Successfully Registered, Login with your Credentials!!!")
                res.redirect('/login');
            }
		})
	} else {
		req.flash("error", "Password Doesn't Matches!!!");
		res.redirect('back');
	}
	
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { 
    successRedirect : "/home",
	failureRedirect : "/login",
}),(req, res) => {
});

//Login Routes
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect : "/home",
	failureRedirect : "/login",
	failureFlash: true
}), (req, res) => {
});



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
