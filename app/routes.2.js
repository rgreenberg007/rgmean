//import { Component, OnInit, ɵConsole } from '@angular/core';
//import { NgForm } from '@angular/forms';

//import { OrderPipe } from 'ngx-order-pipe';
//import { ngxCsv } from 'ngx-csv/ngx-csv';

var path = require('path');
var Todo = require('./models/todo');
var toDoGrp = require('./models/toDoGrp');
var user = require('./models/user');
var userGrp = require('./models/userGrp');
var userGrpDetail = require('./models/userGrpDetail');

module.exports = function(app, passport) {

    //var mygrp_id = ""; // really grp which is grp name

// normal routes ===============================================================

    // show the home page ?  (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // Bring up profile from a link near logout.
    app.get('/profile', isLoggedIn, function(req, res) {
        
        //res.render('login.ejs', { message: req.flash('loginMessage') });
        //res.render('profile.ejs', {
        res.render('profile.ejs', { message: req.flash('profileMessage') ,
            user : req.user
        });
    });

    // show a  given list =========================
    app.get('/appPage1', isLoggedIn, function(req, res) {
        res.render('appPage1.ejs', {
            user : req.user
        });
    });

    // App starting page once logged in or if already logged in =========================
    // show all public lists on start prior to login or as guest
    app.get('/appPageGrp', isLoggedIn, function(req, res) {
        res.render('appPageGrp.ejs', {
            user : req.user
        });
    });

    app.get('/admin', isLoggedIn, function(req, res) {
        res.render('admin.ejs', {
            user : req.user
        });
    });

    // show no longer be used - 
    app.get('/appPageGrpAdmin', isLoggedIn, function(req, res) {
        res.render('appPageGrpAdmin.ejs', {
            user : req.user
        });
    });

    app.get('/users', isLoggedIn, function(req, res) {
        res.render('users.ejs', {
            user : req.user
        });
    });

    app.get('/userGrps', isLoggedIn, function(req, res) {
        res.render('userGrps.ejs', {
            user : req.user
        });
    });

    app.get('/userGrpsDetails', isLoggedIn, function(req, res) {
        failureFlash : true;
        res.render('userGrpsDetails.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/userGrpsDetailsA', isLoggedIn, function(req, res) {
        failureFlash : true;
        res.render('userGrpsDetailsA.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/userGrpsA', isLoggedIn, function(req, res) {
        res.render('userGrpsA.ejs', {
            user : req.user
        });
    });

    app.get('/signupB', isLoggedIn, function(req, res) {
        res.render('signupB.ejs', {
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
            failureRedirect : '/login', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        app.get('/chgPassword', function(req, res) {
            res.render('chgPassword.ejs', { message: req.flash('chgPasswordMessage') });
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

    app.delete('/api/users/:user_id', function (req, res) {
        user.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);
            getUsers(res);
        });
    });

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        //if (confirm('Are you sure to delete this record ?') == true) {
          //  console.log("onSelfDelete yes delete");
        //} else {
        //    console.log("onSelfDelete No delete");
        //}
        var user            = req.user;
        console.log("routes.js app.get unlink/local req.user.id = " + req.user.id);
        user.local.email    = undefined;
        user.local.password = undefined;
        user.local.screenName    = undefined;
        //user.save(function(err) {
        //    res.redirect('/profile');
        //});
        user.remove({
            _id: req.user.id
        }, function (err, user) {
            if (err) res.send(err);
            res.redirect('/'); ;
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
        //var user2            = req.user;
        user.local.screenName    = req.body.screenNameNew; //"newname";
        user.save(function(err) {
            if (err) {
                //res.send(err);
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    //return res.status(201).send({ success: false, message: 'Screen Name already taken!' });
                    //return res.status(200).json({status:"Error: Screen Name already taken!"});
                    //return res.json({statusMsg:"Error: Screen Name already taken!"});
                    //res.render('profile.ejs', {user : user, success :true,successs :true,error: err});
                    //return res.status(200).send({ user: user, message: 'Error: Screen Name already taken!' });
                    //return res.send( {  message: 'Error: Screen Name already taken!' });
                    return res.render('profile.ejs', { user: user, message: 'Error: Screen Name already taken!' });
                  } else {
                    // Some other error
                    return res.status(500).send(err);
                  }
            } else {
                res.redirect('/appPage1');
            }
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
        console.log("req.body.listItem: " + req.body.listItem);
        console.log("req.body.screenName: " + req.body.screenName);
        //console.log("res.body: " + JSON.stringify(res.body));

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
           listItem: req.body.listItem,
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

    app.get('/api/userGrps', function (req, res) {
        getUserGrps(res);
    });

    app.get('/api/userGrps/detOfGrp/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/detOfGrp/:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        getUserGrpsB(mygrp_id, res);
    });

    app.get('/api/userGrps/ownersOfGrp/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/ownersOfGrp/:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        getUserGrpOwners(mygrp_id, res);
    });

    app.get('/api/userGrps/deleteGrp/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/deleteGrp/:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        deleteGrp(mygrp_id, res);
    });

    app.get('/api/userGrps/deleteGrpDetail/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/deleteGrpDetail/:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        deleteGrpDetail(mygrp_id, res);
    });

    app.get('/api/userGrpsA', function (req, res) {
        getUserGrpsA(res);
    });

    app.get('/api/userGrpsDetails', function (req, res) {
        getUserGrpsDetails(res);
    });

    app.get('/api/userGrpsDetailsA', function (req, res) {
        getUserGrpsDetailsA(res);
    });

    app.get('/api/users', function (req, res) {
        getUsers(res);
    });

    app.get('/api/users/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        console.log("routes.js: app.get /api/users/:grp_id mygrp_id = " + mygrp_id);
        getUsersForGrp(mygrp_id, res);
    });

    app.get('/api/users/test1/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/test1:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        console.log("routes.js: app.get /api/users/test1/:grp_id mygrp_id = " + mygrp_id);
        //getUsersForGrp2(mygrp_id, res);
        getUsersForGrp3(mygrp_id, res);
    });

    app.get('/api/users/test2/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/test2:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        console.log("routes.js: app.get /api/users/test2/:grp_id mygrp_id = " + mygrp_id);
        getUsersForGrp4(mygrp_id, res);
    });

    // get all todos
    app.get('/api/toDoGrps', function (req, res) {
        // use mongoose to get all todos in the database
        getToDoGrps(res);
    });

    // create new list via name of new list - todoGrp and send back all toDoGrps after creation
    app.post('/api/toDoGrps', function (req, res) {
        console.log("routes.js: app.post /api/toDoGrps about to create");
        console.log("req.body.listName: " + req.body.listName);
        console.log("req.body.screenName: " + req.body.screenName);
        //console.log("res.body: " + JSON.stringify(res.body));

        // create a toDoGrp, information comes from AJAX request from Angular
        toDoGrp.create({
           listName: req.body.listName,
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

            // get and return all the userGrps after you create another
            getToDoGrps(res);
        });
    });

    // delete a toDoGrp (a list) - need to delete list items of this list also or check list is already empty
    app.delete('/api/toDoGrps/:toDoGrp_id', function (req, res) {
        toDoGrp.remove({
            _id: req.params.toDoGrp_id
        }, function (err, toDoGrp) {
            if (err)
                res.send(err);

            getToDoGrps(res);
        });
    });

    app.post('/api/userGrps', function (req, res) {
        console.log("routes.js: app.post /api/userGrps about to create");
        console.log("req.body: " + JSON.stringify(req.body));
        
        console.log("req.body.grp: " + req.body.grp);
        console.log("req.body.email: " + req.body.email);
        console.log("req.body.grpOwner: " + req.body.grpOwner);
        //console.log("res.body: " + JSON.stringify(res.body));

        // create a toDoGrp, information comes from AJAX request from Angular
        userGrp.create({
           grp: req.body.grp,
           email: req.body.email,
           grpOwner: req.body.grpOwner,
           done: false
        }, function (err, userGrp) {
            if (err)
                res.send(err);
            // get and return all the UserGrps after you create another
            getUserGrps(res);
        });
    });

    app.post('/api/userGrpDetail', function (req, res) {
        console.log("routes.js: app.post /api/userGrpDetail about to create");
        console.log("req.user: " + JSON.stringify(req.user));
        console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.body.grp: " + req.body.grp);
        console.log("req.body.detail: " + req.body.detail);
        console.log("req.body.private: " + req.body.private);
        userGrpDetail.create({
            grp: req.body.grp,
            detail: req.body.detail,
            private: req.body.private,
            done: false
         }, function (err, user) {
            if (err) {
                 //res.send(err);
                 if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate grp name in UserGrpDetail where grp must be unique
                    console.log("dup grp name found!");
                    //failureFlash : true // allow flash messages
                    //res.locals.message = req.flash("Group Name already taken!"); 
                    //return res.render('userGrpsDetails.ejs', { message: req.flash('Group Name already taken!') ,
                    //    user : req.user
                    //});

                    //return res.render('userGrpsDetails.ejs', { user : req.user, message : "Group Name already taken!" });
                    return res.status(500).send({ user : req.user, message : "Group Name already taken!" });
                    //return res.status(200).send({  message : "Group Name already taken!" });

                    //res.render('userGrpsDetails.ejs', { user : req.user, message: 'Group Name already taken'
                    //});
                    //res.render('userGrpsDetails.ejs', {
                    //    user : req.user,
                    //    message: "Group Name aleady taken!" 
                    //});

                  } else {
                    // Some other error
                    console.log("Some other error found!");
                    return res.status(500).send(err);
                  }
            } else {
                // get and return all the UserGrpsDetails after you create another
                console.log(" getUserGrpsDetails - no dup or error in creation");
                userGrp.create({
                    grp: req.body.grp,
                    email: req.user.local.email,
                    grpOwner: 'Y', // req.body.grpOwner,
                    done: false
                 }, function (err, userGrp) {
                     if (err)
                         res.send(err);
                     // get and return all the UserGrps after you create another
                     getUserGrpsDetails(res);  //getUserGrps(res);
                 });
                //getUserGrpsDetails(res);
            }
         });
     });
    
    app.post('/api/userGrpDetailA', function (req, res) {
        console.log("routes.js: app.post /api/userGrpDetailA about to create");
        console.log("req.user: " + JSON.stringify(req.user));
        console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.body.grp: " + req.body.grp);
        console.log("req.body.detail: " + req.body.detail);
        console.log("req.body.private: " + req.body.private);
        console.log("req.body.mail: " + req.body.email);
        userGrpDetail.create({
            grp: req.body.grp,
            detail: req.body.detail,
            private: req.body.private,
            done: false
         }, function (err, user) {
            if (err) {
                 //res.send(err);
                 if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate grp name in UserGrpDetail where grp must be unique
                    console.log("dup grp name found!");
                    return res.status(500).send({ user : req.user, message : "Group Name already taken!" });
                  } else {
                    // Some other error
                    console.log("Some other error found!");
                    return res.status(500).send(err);
                  }
            } else {
                // get and return all the UserGrpsDetails after you create another
                console.log(" getUserGrpsDetailsA - no dup or error in creation");

                userGrp.create({
                    grp: req.body.grp,
                    email: req.user.local.email,
                    grpOwner: 'Y', // req.body.grpOwner,
                    done: false
                 }, function (err, userGrp) {
                     if (err)
                         res.send(err);
                     // get and return all the UserGrps after you create another
                     getUserGrpsDetailsA(res);  //getUserGrps(res);
                 });
            }
         });
     });

    app.post('/api/userGrpsDelUser', function (req, res) {
        console.log("routes.js: app.post /api/userGrpsDelUser about to delete");
        console.log("req.body: " + JSON.stringify(req.body));
        
        console.log("req.body.grp: " + req.body.grp);
        console.log("req.body.email: " + req.body.email);
        console.log("req.body.grpOwner: " + req.body.grpOwner);
        userGrp.remove({
           grp: req.body.grp,
           email: req.body.email,
           grpOwner: req.body.grpOwner
        }, function (err, userGrp) {
            if (err)
                res.send(err);
            // get and return all the Users in Grps after you delete a user from a grp
            getUserGrps(res);
        });
    });

    // delete a toDoGrp (a list) - need to delete list items of this list also or check list is already empty
    app.delete('/api/userGrps/:userGrp_id', function (req, res) {
        userGrp.remove({
            _id: req.params.userGrp_id
        }, function (err, userGrp) {
            if (err)
                res.send(err);
            getUserGrps(res);
        });
    });

    //app.change('/api/userGrps/:userGrp_id', function (req, res) {
      //  userGrp.change({
      //      _id: req.params.userGrp_id
      //  }, function (err, userGrp) {
      //      if (err)
      //          res.send(err);
      //      getUsers(res);
      //  });
    //});

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

function getUsers(res) {
    user.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    }).sort( {screenName : 1} );
};

function getUsers3(usersToExclude, res) {
    user.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    }).sort( {"local.screenName" : 1} ).where ({"local.email": {$nin: usersToExclude}});
    // { field: { $nin: [ <value1>, <value2> ... <valueN> ]} }
};

function getUsers4(usersToExclude, res) {
    user.find(function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    }).sort( {"local.screenName" : 1} ).where ({"local.email": {$in: usersToExclude}});
};

function getUsersForGrp(mygrp_id, res) {
    user.find(function (err, users) {
        console.log("routes.js: getUsersForGrp  mygrp_id = " + mygrp_id);
        if (err) {
            res.send(err);
        }
        res.json(users); 
    //});
    // does not seem to work}).sort( {screenName : 1} );
    // Seems to work }).where("local.screenName").ne("Admin");
    //  Seems to work }).where("local.email").ne("admin");
    // show users for only users that are not already in the grp
    //    find email from userGrps where grp ne mygrp_id
    //var myemails = res;
    //userGrp.find(function (err, userGrps) {
      //  if (err) {
      //      res.send(err);
      //  }
      //  myemails = userGrps; 
    //});
    //}).where("grp").ne("grp1");
    //}).where("grp").ne("grp1").distinct("email");
    //console.log("routes.js: myemails = " + JSON.stringify(myemails) );
    //getUserGrps(myemails);
    //console.log("routes.js: myemails = " + myemails );
    //console.log("routes.js: myemails = " + JSON.stringify(myemails) );
    }).where("local.email").ne("admin");
};

function getUsersForGrp2(mygrp_id, res) {
    userGrp.find(function (err, userGrps) {
        console.log("routes.js: getUsersForGrp  mygrp_id = " + mygrp_id);
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).where("grp").ne(mygrp_id);
};

function getUsersForGrp3(mygrp_id, res) {
    console.log("routes.js: getUsersForGrp3  mygrp_id = " + mygrp_id);

    // This gets all the users in the past in grp - and want to exclude these users in a returned user list.
    var usersToExclude;
    //var criteria = {'grp': {$ne: mygrp_id}} ; // {'grp': mygrp_id};
    var criteria = {'grp': mygrp_id};
    userGrp.distinct('email', criteria, function (err, userGrps) {
        if (err) return res.send(err);
        //user.find({email: {$in: userGrps}}).populate('local.email').exec(function(err, users) {
        //    if (err) return next(err);
        //    return res.json(users);
        //});
        //return res.json(userGrps);
        usersToExclude = userGrps;
        for (var i = 0; i < usersToExclude.length; i++ ) {
            console.log("routes.js: getUsersForGrp3 usersToExclude[i] = " + usersToExclude[i] );
        }
        getUsers3(usersToExclude, res);
    });
};

function getUsersForGrp4(mygrp_id, res) {
    console.log("routes.js: getUsersForGrp4  mygrp_id = " + mygrp_id);

    // This gets all the users in the past in grp - and want to exclude these users in a returned user list.
    var usersToExclude;
    //var criteria = {'grp': {$ne: mygrp_id}} ; // {'grp': mygrp_id};
    var criteria = {'grp': mygrp_id};
    userGrp.distinct('email', criteria, function (err, userGrps) {
        if (err) return res.send(err);
        usersToExclude = userGrps;
        for (var i = 0; i < usersToExclude.length; i++ ) {
            console.log("routes.js: getUsersForGrp3 usersToExclude[i] = " + usersToExclude[i] );
        }
        getUsers4(usersToExclude, res);
    });
};

function getUserGrps(res) {
    //userGrp.find(function (err, userGrps) {
    userGrp.find(function (err, userGrps) {
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).sort( {grp : 1, email : 1} ) ;
};

function getUserGrpsA(res) {
    //userGrp.find(function (err, userGrps) {
    userGrp.find(function (err, userGrps) {
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).sort( {grp : 1, email : 1} ) ;
};

function getUserGrpsDetails(res) {
    userGrpDetail.find(function (err, userGrpsDetails) {
        if (err) {
            res.send(err);
        }
        res.json(userGrpsDetails); 
    }).sort( {grp : 1} ) ;
};

function getUserGrpsDetailsA(res) {
    userGrpDetail.find(function (err, userGrpsDetailsA) {
        if (err) {
            res.send(err);
        }
        res.json(userGrpsDetailsA); 
    }).sort( {grp : 1} ) ;
};

function getUserGrpsB(mygrp_id, res) {
    //var query = { grp: mygrp_id };
    userGrp.find(function (err, userGrps) {
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).sort( {grp : 1, email : 1} ).where ( {grp : mygrp_id} ) ;
};

function getUserGrpOwners(mygrp_id, res) {
    userGrp.find(function (err, userGrps) {
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).sort( {grp : 1, email : 1} ).where ( {grp : mygrp_id, grpOwner : "Y"} ) ;
};

function deleteGrp(grp, res) {
    userGrp.remove({ grp : grp }, function (err, user) {
        if (err)
            res.send(err);
        getUserGrpsA(res);
    });
};

function deleteGrpDetail(grp, res) {
    userGrpDetail.remove({ grp : grp }, function (err, user) {
        if (err)
            res.send(err);
        getUserGrpsDetails(res);
    });
};

function deleteGrpDetailA(grp, res) {
    userGrpDetail.remove({ grp : grp }, function (err, user) {
        if (err)
            res.send(err);
        getUserGrpsDetailsA(res);
    });
};

function onSelfDelete() {
    if (confirm('Are you sure to delete this record ?') == true) {
        console.log("onSelfDelete yes delete");
    } else {
        console.log("onSelfDelete No delete");
    }
};
// After adding user to group want to reload page to get all users in all groups '
// and also users still in selected group
// This loads the usergrps.ejs page from the Admin screen
//    app.get('/api/userGrps', function (req, res) {
//    getUserGrps(res);
//});