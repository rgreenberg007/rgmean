var path = require('path');
var Todo = require('./models/todo');
var toDoGrp = require('./models/toDoGrp');

module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page ?  (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    // RG: need to bring up profile from a link near logout.
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // App starting page once logged in or if already logged in =========================
    app.get('/appPage1', isLoggedIn, function(req, res) {
        res.render('appPage1.ejs', {
            user : req.user
        });
    });

    // App starting page once logged in or if already logged in =========================
    app.get('/appPageGrp', isLoggedIn, function(req, res) {
        res.render('appPageGrp.ejs', {
            user : req.user
        });
    });


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/appPageGrp', // '/appPage1', // '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/appPage1', // '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/appPage1', // '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/appPage1', // '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/appPage1', // '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/appPage1', // '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.local.screenName    = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // change profile
    app.post('/changeProfile', isLoggedIn, function(req, res) {
        console.log("req.body: " + JSON.stringify(req.body));
        var user            = req.user;
        //user.local.email    = undefined;
        //user.local.password = undefined;
        user.local.screenName    = req.body.screenName; //"newname";
        user.save(function(err) {
            res.redirect('/appPage1');
        });
    });

    // toDo list stuff

    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        console.log("routes.js: app.post /api/todos about to create");
        console.log("req.body.text: " + req.body.text);
        console.log("req.body.screenName: " + req.body.screenName);
        //console.log("res.body: " + JSON.stringify(res.body));

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
           text: req.body.text,
           //text: {"item": "item newone", "screenName": "nuts"},
           //screenName: "whoit",   
           screenName: req.body.screenName,
           ownerID: req.body.ownerID,
           done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // get all todos
    app.get('/api/toDoGrps', function (req, res) {
        // use mongoose to get all todos in the database
        getToDoGrps(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/toDoGrps', function (req, res) {
        console.log("routes.js: app.post /api/toDoGrps about to create");
        console.log("req.body.grpName: " + req.body.grpName);
        console.log("req.body.screenName: " + req.body.screenName);
        //console.log("res.body: " + JSON.stringify(res.body));

        // create a todo, information comes from AJAX request from Angular
        toDoGrp.create({
           grpName: req.body.grpName,
           //text: {"item": "item newone", "screenName": "nuts"},
           //screenName: "whoit",   
           screenName: req.body.screenName,
           public: 'Y',
           ownerID: req.body.ownerID,
           other: "other placeholder",
           done: false
        }, function (err, toDoGrp) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getToDoGrps(res);
        });
    });

    // delete a todo
    app.delete('/api/toDoGrps/:toDoGrp_id', function (req, res) {
        toDoGrp.remove({
            _id: req.params.toDoGrp_id
        }, function (err, toDoGrp) {
            if (err)
                res.send(err);

            getToDoGrps(res);
        });
    });

    // application -------------------------------------------------------------
    //??? ??? 
    //app.get('*', function (req, res) {
      //  res.sendFile(__dirname + '../views/toDoView.ejs'); // 
    //});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getToDoGrps(res) {
    toDoGrp.find(function (err, toDoGrps) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(toDoGrps); // return all todos in JSON format
    });
};