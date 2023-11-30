import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
import session from 'express-session';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + '/public');

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(session({
    name: 'AuthState',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false
}));

app.use('/', (req, res, next) => {
    if (req.originalUrl !== "/") {
        return next();
    }

    if (req.session.user) {
        console.log("heree");
        return res.redirect("/main");
    } else {
        return res.redirect("/login");
    }
});

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/main");
    } else {
        next();
    }
});

app.use('/register', (req, res, next) => {
    if (req.session.user) {
        return req.redirect("/main");
    } else {
        next();
    }
});

app.use('/main', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/create', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/addCourse', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});


app.use('/logout', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});