const LocalStrategy = require("passport-local").Strategy;

const User = require('./user/user');

module.exports = function(passport){
    //Configuration de la session via passport
    //Reuquis pour permettre une persistance des utilisateurs logged in.

    //sérialisation des données utilisateur pour la session (on récupère les doinnées utilisateurs et on les fait concorder)
    passport.serializeUser(function(user,done){
        done(null.user.id);
    });
    passport.deserializeUser(function(id,done){
        User.findById(id, function (err, user){
            done(err, user);
        });
    });

    //système de validation de notre connection. 
    //Le code ci-dessous n'a pas été testé et les if sont sans accolades ce qui me perturbe vu que ce n'est pas une bonne pratique
    //Cependant j'ai lui qu'il était possible de le faire dans le cadre ou le if ne donne qu'une seule instruction.
    //Ce sera modifié après test et bon fonctionnement de la base de données. 
    passport.use("local-login",new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback:true
    },
    function(req,email,password,done){
        if(email)
            email = email.toLowerCase();

    //asynchrone
        process.newTick(function(){
            User.findOne({"local.email": email}, function(err, user){
                if(err)
                    return done(err);

                if(!user)
                    return done (null,false, req.flash("logInMessage", "No user found."));

                if(!user.validPassword(password)){
                    return done (null, false, req.flash ("logInMessage", "Wrong password."));

                }else{
                    return done (null,user);
                };
            });
        });
    }));

    //Validation de l'inscription.
    passport.use('local-signup', new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true
    },
    function(req,email,password,done){
        if(email)
            email=email.toLowerCase();
        //asynchrone
        process.nextTick(function(){
            if(!req.user){
                User.findOne({"local.email": email}, function(err,user){
                    if (err)            
                        return done(err);
                    if(user){
                        return done(null,false, req.flash("signInMessage", "That email is already taken."));
                    }else{
                        const newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err){
                            if(err)
                                return done(err);

                                return done(null, newUser);
                        });
                    };
                });
            }else if (!req.user.local.email){
                User.findOne({"local.email":email}, function(err,user){
                    if (err)
                        return done(err);
                    if (user){
                        return done(null, false, req.flash("logInMessage", "That email is already taken"));
                    }else{
                        const user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function(err){
                            if (err)
                                return done(err);
                                return done(null, user);
                        });
                    };
                });
            }else{
                return done(null, req.user);
            };
        });
    }));




}