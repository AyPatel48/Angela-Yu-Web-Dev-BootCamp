//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

app.use(secretPasswordMatcher);

function secretPasswordMatcher(req, res, next){
    const password = req.body["password"];
    if (password == "ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", (req, res) => {
    res.sendFile(__dirname + "/public/secret.html");
})

app.post("/check", (req, res) => {
    if(userIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        res.redirect("/");
    }
})