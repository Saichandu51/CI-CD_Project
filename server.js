const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const path = require('path');
const PORT=process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.static('./static'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
    secret: 'tacgod',
    resave: false,
    saveUninitialized: false,
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Serialize / Deserialize
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Attach accessToken to the user object
    profile.accessToken = accessToken;
    return done(null, profile);
}));


// Routes
app.get('/', (req, res) => {
    try {
        res.render('home', { user: req.user });
    } catch (error) {
        console.log(error);
    }
});

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.render('profile', { user: req.user });
});

app.get('/repos', async (req, res) => {
    const token = req.user.accessToken
    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    try {
        const url = `https://api.github.com/users/${req.user.username}/repos`;
        const response = await axios(url, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        if(!response){
            console.log('Error while action data fetching');
        }
       // console.log(response.data);
        // res.json(response.data);
        res.render('repo',{repos:response.data});
    } catch (error) {
        console.log(error);
    }
})

app.post('/runs', async (req, res) => {
    try {
       
        const apiUrl = `https://api.github.com/repos/${req.user.username}/${req.body.name}/actions/runs`;
        const response = await axios.get(apiUrl);

        if (!response.data.workflow_runs) {
            return res.status(400).json({ message: 'No workflow runs found' });
        }
        res.render('action',{data:response.data.workflow_runs})
        // console.log('data Fectched');
        // res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'API error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:3000");
});
