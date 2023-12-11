
module.exports = function(app, passport){
//Route vers la Home page
app.get("/",(req,res)=> res.render("pages/index"));

//Route qui redirige lors de la déconnection.
app.get("/logOut",function(req,res){
    req.logout();
    res.redirect("/");
});

//Apres authentification via le log in on se retrouve sur la page user.
app.get("/userProfil",isLoggedIn,function(req,res){
    res.render("pages/user/userProfil",{
        user:req.user
        });
    });



//----Authentification s'inscrire et se connecter pour première fois.

//Insctiption-----
//route jusqu'au formulaire d'inscription
app.get("/signIn", function(req,res){
    res.render("pages/user/signIn", {
        message: req.flash("signInMessage")
    })
});
//Processus de validation de l'inscription.
app.post("/signIn",passport.authenticate("local-signin",{
    successRedirect:'/userProfil',
    failureRedirect:'/signin',
    failureFlash:true
}));

//Première connection-----
//Route jusqu'au formulaire de connection.
app.get("/logIn",function(req,res){
    res.render("pages/user/logIn", {message:req.flash("logInMessage")});
});

//Processus de validation de la connection.
app.post("/logIn",passport.authenticate("local-login",{
    successRedirect:"/userProfil",
    failureRedirect:"/logIn",
    failureFlash:true
}));



//----Connections suivantes.
app.get("/connect/local", function(req,res){
    res.render("connect-local",{message: req.flash("logInMessage")});
});
app.post("/connect/local", passport.authenticate("local-signup",{
    successRedirect: "/userProfil",
    failureRedirect: "/connect/local",
    failureFlash:true
}));

//----- Déconnection.
app.get("/unlink/local",isLoggedIn, function(req,res){
    const user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err){
        res.redirect("/userProfil");
    });
});


//Fonction pour s'assurer que l'utilisateur est parfaitement log in.
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

};


