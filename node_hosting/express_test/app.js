const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const routes = require('./routes/routes') (app);

//j'ai choisi d'utiliser le CommonJs volontairement pour apprendre cette synthaxe 
//Au cours de mes expérimentations précédentes avec React j'utilisais deja ES6.
//En utilisant CommonJs je met a jour mes connaissances des différentes pratiques.




//j'utilise ejs pour render mon application. j'aurais pu utiliser Handlebars que j'ai déja utilisé au cours de mes travaux avec php.
app.set("view engine","ejs");

/* j'utilise express.static pour définir un dossier statique pour mes différents
 assets (css/img).*/
 
app.use(express.static(path.join(__dirname, 'public')));



//notre server local
app.listen(PORT,()=>{
    console.log ('Le serveur est lancé');
});

//en cas d'erreur au lancement
process.on("unhandledRejection",err => {
    console.log(`Une erreur est survenue: ${err.message}`);
    server.close(()=> process.exit(1));
});