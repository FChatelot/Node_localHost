const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');


//j'utilise ejs pour render mon application
app.set("view engine","ejs");

/* j'utilise express.static pour définir un dossier statique pour mes différents
 assets (css/img).*/
 
app.use(express.static(path.join(__dirname, 'public')));
//routes
app.get("/",(req,res)=> res.render("pages/index"));
app.get("/logIn",(req,res)=> res.render("pages/user/logIn"));
app.get("/logOut",(req,res)=> res.render("pages/user/logOut"));
app.get("/signIn",(req,res)=> res.render("pages/user/signIn"));
app.get("/userProfil",(req,res)=> res.render("pages/user/userProfil"));


app.listen(PORT,()=>{
    console.log ('Le serveur est lancé');
});

//en cas d'erreur au lancement
process.on("unhandledRejection",err => {
    console.log(`Une erreur est survenue: ${err.message}`);
    server.close(()=> process.exit(1));
});