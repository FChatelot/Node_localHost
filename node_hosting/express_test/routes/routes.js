
module.exports = function(app){
//routes
app.get("/",(req,res)=> res.render("pages/index"));
app.get("/logIn",(req,res)=> res.render("pages/user/logIn"));
app.get("/logOut",(req,res)=> res.render("pages/user/logOut"));
app.get("/signIn",(req,res)=> res.render("pages/user/signIn"));
app.get("/userProfil",(req,res)=> res.render("pages/user/userProfil"));
}