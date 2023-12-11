const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const process= require('node:process');
const flash = require('connect-flash')//utilisé pour store des messages. Le message apparaitra dans la page de redirection.
const passport= require('passport');
const mongoose= require('mongoose');
const mongodb= require('./configs/mongoDb/mongodb.js');

main().catch(err=> console.log(err));

async function main(){
    await mongoose.connect(mongodb.url);
}


//authentification needs
const cookieParser = require ('cookie-parser');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const morgan = require ('morgan');

//j'ai choisi d'utiliser le CommonJs volontairement pour apprendre cette synthaxe 
//Au cours de mes expérimentations précédentes avec React j'utilisais deja ES6.
//En utilisant CommonJs je met a jour mes connaissances des différentes pratiques.

//Set up de l'app avec tout les éléments nécessaires à l'authentificateur.

app.use(morgan('dev')); //morgan est un http request logger middleware pour node.js  https://expressjs.com/en/resources/middleware/morgan.html
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.set("view engine","ejs");
//j'utilise ejs pour render mon application. j'aurais pu utiliser Handlebars que j'ai déja utilisé au cours de mes travaux avec php.
/* j'utilise express.static pour définir un dossier statique pour mes différents
 assets (css/img).*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:'lepèrenoelexiste',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());//permet de garder une session logged in ouverte.
app.use(flash());

require('./routes/routes') (app)(passport);
//notre server local
app.listen(PORT,()=>{
    console.log ('Le serveur est lancé');
});

//en cas d'erreur au lancement
process.on("unhandledRejection",err => {
    console.log(`Une erreur est survenue: ${err.message}`);
    server.close(()=> process.exit(1));
});