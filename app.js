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
        return res.redirect("/home");
    } else {
        return res.redirect("/login");
    }
});

app.use('/login', (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/home");
    } else {
        next();
    }
});

app.use('/register', (req, res, next) => {
    if (req.session.user) {
        return req.redirect("/home");
    } else {
        next();
    }
});

app.use('/home', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/home/:message', (req, res, next) => {
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

app.use('/addProfessor', (req, res, next) => {
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

app.use('/delete', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/prof', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/chat', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/course', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        next();
    }
});

app.use('/bestProfessors', (req, res, next) => {
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

app.use('/admin', (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login");
    } else {
        if (req.session.user.admin == true){
            next();
        } else{
            //error code taken from lecture code, commented out to simply just redirect to home page
            //return res.status(403).json({error: '403: Forbidden'})
            return res.redirect("/home");
        }
        ;
    }
});

app.use('/delete/:reviewId' , (req, res, next) => {
  if (!req.session.user) {
      return res.redirect("/login");
  } else if (req.body.switch === "delete") {
    req.method = "DELETE";
    next();
  } else {
    next();
  }
});

configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});