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
var myList = require('./models/myList');
var myItem = require('./models/myItem');
var myItemRank = require('./models/myItemRank');
var myComment = require('./models/myComment');
var myLogin = require('./models/myLoginRecord');

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

    app.get('/myGrps', isLoggedIn, function(req, res) {
        res.render('myGrps.ejs', {
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
        console.log("routes.js /userGrpsDetails reached.")
        failureFlash : true;
        res.render('userGrpsDetails.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/myAbout', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /myAbout reached.");
        failureFlash : true;
        res.render('myAbout.ejs', {
            user : req.user,
            message: "" 
        });
    });

    app.get('/testmyLists', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /testmyLists reached.");
        failureFlash : true;
        res.render('testmyLists.ejs', {
            user : req.user,
            message: "" 
        });
    });

    app.get('/testmyListsIpad', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /testmyListsIpad reached.");
        failureFlash : true;
        res.render('testmyListsIpad.ejs', {
            user : req.user,
            message: "" 
        });
    });

    app.get('/testmyPublicLists', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /testmyPublicLists reached.");
        failureFlash : true;
        res.render('testmyPublicLists.ejs', {
            user : req.user,
            message: "" 
        });
    });

    app.get('/testmyIntro', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /testmyIntro reached.");
        failureFlash : true;
        res.render('testmyIntro.ejs', {
            user : req.user,
            message: "" 
        });
    });

    app.get('/myPublicLists', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /myPublicLists reached.");
        failureFlash : true;
        res.render('myPublicLists.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/myPublicListsItems/:myListItems', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /myPublicListsItems reached.");
        var myListItems = req.params.myListItems;
        console.log("routes.js myListItems: " + myListItems);
        failureFlash : true;
        res.render('myPublicListsItems.ejs', {
            user : req.user,
            myListItems : myListItems,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/myLists', isLoggedIn, function(req, res) {
        console.log("routes.js /myLists reached.")
        failureFlash : true;
        res.render('myLists.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/myAdminLists', isLoggedIn, function(req, res) {
        console.log("routes.js /myAdminLists reached.")
        failureFlash : true;
        res.render('myAdminLists.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/dumpMyComments', isLoggedIn, function(req, res) {
        console.log("routes.js /dumpMyComments reached.")
        failureFlash : true;
        res.render('dumpMyComments.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/dumpMyLogins', isLoggedIn, function(req, res) {
        console.log("routes.js /dumpMyLogins reached.")
        failureFlash : true;
        res.render('dumpMyLogins.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/dumpMyItemRanks', isLoggedIn, function(req, res) {
        console.log("routes.js /dumpMyItemRanks reached.")
        failureFlash : true;
        res.render('dumpMyItemRanks.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });
    
    app.get('/dumpMyItems', isLoggedIn, function(req, res) {
        console.log("routes.js /dumpMyItems reached.")
        failureFlash : true;
        res.render('dumpMyItems.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/dumpMyLists', isLoggedIn, function(req, res) {
        console.log("routes.js /dumpMyLists reached.")
        failureFlash : true;
        res.render('dumpMyLists.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/myAdminListsRank', isLoggedIn, function(req, res) {
        console.log("routes.js /myAdminListsRank reached.")
        failureFlash : true;
        res.render('myAdminListsRank.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/myAdminListsRankForAdmin', isLoggedIn, function(req, res) {
        console.log("routes.js /myAdminListsRankForAdmin reached.")
        failureFlash : true;
        res.render('myAdminListsRankForAdmin.ejs', {
            user : req.user,
            message: "" //req.flash('grpsDetailsMessage')
        });
    });

    app.get('/index', isLoggedInDontCare, function(req, res) {
        console.log("routes.js /index reached.")
        failureFlash : true;
        res.render('index.ejs', {
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

    app.get('/meInGrps', isLoggedIn, function(req, res) {
        res.render('meInGrps.ejs', {
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
            successRedirect : '/myPublicLists', //'/appPageGrp', // '/appPage1', // '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/backdoorLogin', function(req, res) {
            res.render('backdoorLogin.ejs', { message: req.flash('backdoorLoginMessage') });
        });

        app.post('/backdoorLogin', function (req, res) {
            //console.log("routes.js post /backdoorLogin req.params: " + JSON.stringify(req.params));
            console.log("routes.js post /backdoorLogin req.body: " + JSON.stringify(req.body));
            console.log("routes.js post /backdoorLogin req.user: " + JSON.stringify(req.user));
            //var user            = req.user;
            user.findOne({ 'local.email' :  req.body.email }, function(err, user) {
                if (err) { return done(err); };
                if (!user) {
                    return req.flash('loginMessage', 'No user found.');
                } else {
                ////if (!user.validPassword(password))
                ////    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                console.log("routes.js post /backdoorLogin req.session.passport.user: " + JSON.stringify(req.session.passport.user));
                console.log("routes.js post /backdoorLogin user: " + JSON.stringify(user));
                    req.user = user;
                    req.session.passport.user = user._id;
                    console.log("routes.js post /backdoorLogin req.session.passport.user: " + JSON.stringify(req.session.passport.user));
                    //res.redirect('/myPublicLists#' + req.body.email);
                    res.redirect('/myPublicLists');
                ////return done(null, user);
                };
            });
        });

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        app.get('/chgPassword', function(req, res) {
            console.log("chgPassowrd req.user: " + JSON.stringify(req.user));
            var user            = req.user;
            res.render('chgPassword.ejs', { user: user, message: req.flash('chgPasswordMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/myPublicLists', // '/appPage1', // '/profile', // redirect to the secure profile section
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
        user.local.private    = req.body.privateNew;
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
                //res.redirect('/appPage1');
                res.redirect('/myPublicLists');
            }
        });
    });

    app.post('/chgPassword', isLoggedIn, function(req, res) {
        console.log("req.body: " + JSON.stringify(req.body));
        var user            = req.user;
        user.local.password    = user.generateHash(req.body.password); //"new password";
        user.save(function(err) {
            if (err) {
                    return res.status(500).send(err);  
            } else {
                //res.redirect('/appPage1');
                res.redirect('/myPublicLists');
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
        deleteGrp(mygrp_id, req, res);
    });

    app.get('/api/userGrps/deleteGrpDetail/:grp_id', function (req, res) {
        console.log("routes.js: app.get /api/users/deleteGrpDetail/:grp_id called with grp_id = " + req.params.grp_id);
        var mygrp_id = req.params.grp_id;
        deleteGrpDetail(mygrp_id, req, res);
    });

    app.get('/api/userGrpsA', function (req, res) {
        getUserGrpsA(req.user.local.email,res);
    });

    app.get('/api/getAllMyGrps', function (req, res) {
        //getUserGrpsA(req.user.local.email,res);
        getAllMyGrps(req.user.local.email,res);
    });

    app.get('/api/getPubGrps', function (req, res) {
        getPubGrps(req.user.local.email,res);
    });

    app.get('/api/getAllPublicGrps', function (req, res) {
        getAllPublicGrps(res);
    });

    app.get('/api/getPubGrpsIn', function (req, res) {
        getPubGrpsIn(req.user.local.email,res);
    });

    app.get('/api/getPubGrpsOut', function (req, res) {
        getPubGrpsOut(req.user.local.email,res);
    });

    app.get('/api/userGrpsDetails', function (req, res) {
        //getUserGrpsDetails(res);
        getUserGrpsDetailsForUser(req.user.local.email, res);
    });

    app.get('/api/myPublicLists', function (req, res) {
        getMyPublicLists(res);
    });

    app.get('/api/myLists', function (req, res) {
        console.log("routes.js get /api/myLists " + JSON.stringify(req.params));
        getMyListsOwner(req.params.owner, res);
        //getMyLists(res);
    });

    app.delete('/api/myLists/:id', function (req, res) {
        console.log("routes.js delete /api/myLists/:id " + JSON.stringify(req.params));
        console.log("routes.js delete /api/myLists/:id req.body: " + JSON.stringify(req.body));
        myList.remove({
            _id: req.params.id
        }, function (err, myLists) {
            if (err)
                res.send(err);
            getMyListsOwner(req.params.owner, res);
            //getMyLists(res);
        });
    });

    app.delete('/api/delMyLogin/:id', function (req, res) {
        console.log("routes.js delete /api/delMyLogin/:id " + JSON.stringify(req.params));
        console.log("routes.js delete /api/delMyLogin/:id req.body: " + JSON.stringify(req.body));
        myLogin.remove({
            _id: req.params.id
        }, function (err, myLists) {
            if (err) {
                res.send(err);
                return;
            }
            getDumpMyLogins(res);
        });
    });

    app.post('/api/delMyList/', function (req, res) {
        console.log("routes.js post /api/delMyList req.params: " + JSON.stringify(req.params));
        console.log("routes.js post /api/delMyList req.body: " + JSON.stringify(req.body));
        console.log("routes.js post /api/delMyList req.user: " + JSON.stringify(req.user));
        myList.remove({
            _id: req.body.id
        }, function (err, myLists) {
            if (err)
                res.send(err);
            getMyListsOwner(req.body.owner, res);
            //getMyLists(res);
        });
    });

    app.get('/api/myListsOwner/:owner', function (req, res) {
        console.log("routes.js get /api/myListsOwner/:owner " + JSON.stringify(req.params));
        getMyListsOwner(req.params.owner, res);
    });

    app.get('/api/myAdminListsOwner/:owner', function (req, res) {
        console.log("routes.js get /api/myAdminListsOwner/:owner " + JSON.stringify(req.params));
        getMyAdminListsOwner(req.params.owner, res);
    });
    
    app.get('/api/myAdminLists', function (req, res) {
        console.log("routes.js get /api/myAdminLists " + JSON.stringify(req.params));
        getMyAdminLists(res);
    });

    app.get('/api/dumpMyComments', function (req, res) {
        console.log("routes.js get /api/dumpMyComments " + JSON.stringify(req.params));
        getDumpMyComments(res);
    });
    
    app.get('/api/dumpMyLogins', function (req, res) {
        console.log("routes.js get /api/dumpMyLogins " + JSON.stringify(req.params));
        getDumpMyLogins(res);
    });

    app.get('/api/dumpMyItemRanks', function (req, res) {
        console.log("routes.js get /api/dumpMyItemRanks " + JSON.stringify(req.params));
        getDumpMyItemRanks(res);
    });

    app.get('/api/dumpMyItems', function (req, res) {
        console.log("routes.js get /api/dumpMyItems " + JSON.stringify(req.params));
        getDumpMyItems(res);
    });

    app.get('/api/dumpMyLists', function (req, res) {
        console.log("routes.js get /api/dumpMyLists " + JSON.stringify(req.params));
        getDumpMyLists(res);
    });

    app.get('/api/myPublicItems/:listName', function (req, res) {
        //console.log("/api/myPublicItems req.body: " + JSON.stringify(req.body));
        //console.log("/api/myPublicItems req.user: " + JSON.stringify(req.user));
        console.log("routes.js: app.get /api/myPublicItems:listName called with listName = " + req.params.listName);
        getMyPublicItems( req.params.listName, res);
    });

    app.get('/api/myItems/:listName', function (req, res) {
        getMyItems(req.params.listName, res);
    });

    app.get('/api/myAdminItems:listName', function (req, res) {
        getMyAdminItems(req.params.listName, res);
    });

    app.post('/api/myItemsRemove', function (req, res) {
        console.log("/api/myItems req.body: " + JSON.stringify(req.body));
        console.log("/api/myItems req.user: " + JSON.stringify(req.user));
        console.log("/api/myItems req.params: " + JSON.stringify(req.params));
        myItem.remove({
            _id: req.body.id
        }, function (err, user) {
            if (err)
                res.send(err);
            myListItemCntMinus(req.body.listName);
            myItemRankRemove(req.body.id, req.body.listName );
            getMyItems(req.body.listName, res);
        });
    });

    app.get('/api/userGrpsDetailsForUser', function (req, res) {
        //console.log("/api/userGrpsDetailsForUser req.body: " + JSON.stringify(req.body));
        console.log("/api/userGrpsDetailsForUser req.user: " + JSON.stringify(req.user));
        //var user            = req.user;
        getUserGrpsDetailsForUser(req.user.local.email, res);
    });

    app.get('/api/userGrpsDetailsA', function (req, res) {
        //getUserGrpsDetailsA(res);
        getUserGrpsDetailsForUser(req.user.local.email, res);
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
            //getUserGrps(res);
            getUserGrpsA(req.user.local.email, res);
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
                     //getUserGrpsDetails(res);  //getUserGrps(res);
                     getUserGrpsDetailsForUser(req.user.local.email, res);
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
                     //getUserGrpsDetailsA(res);  //getUserGrps(res);
                     getUserGrpsDetailsForUser(req.user.local.email, res);
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
            //getUserGrps(res);
            getUserGrpsA(req.user.local.email, res);
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

    app.post('/api/removeUserFromGrp', function (req, res) {
        console.log("routes.js: app.delete /api/removeUserFromGrp");
        console.log("req.body: " + JSON.stringify(req.body));
        
        userGrp.remove({
            grp: req.body.grp,
            email: req.body.email
        }, function (err, userGrp) {
            if (err)
                res.send(err);
            getUserGrps(res);
        });
    });

    app.post('/api/createUserInGrp', function (req, res) {
        console.log("routes.js: app.post /api/createUserInGrp");
        console.log("req.body: " + JSON.stringify(req.body));
        
        userGrp.create({
            grp: req.body.grp,
            email: req.body.email,
            grpOwner: req.body.grpOwner
        }, function (err, userGrp) {
            if (err)
                res.send(err);
            getUserGrps(res);
        });
    });

    app.post('/api/myLists', function (req, res) {
        console.log("routes.js: app.post /api/myLists");
        console.log("req.body: " + JSON.stringify(req.body));
        var myPrivate = "Y";      
        if (req.body.view == "Everyone") {
            myPrivate = "N";
        }  
        myList.create({
            name: req.body.name,
            description: req.body.description,
            owner: req.body.owner,
            grp: req.body.view,
            view: req.body.view,
            private: myPrivate,
            edit: req.body.edit,
            rank: req.body.rank
        }, function (err, myList) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                   console.log("dup list name found!");
                   return res.status(500).send({ user : req.user, message : "List Name already taken!" });
                } else {
                    console.log("Some other error found!");
                    return res.status(500).send(err);
                }
            } else {
                getMyListsOwner(req.body.owner, res);
            }
        });
    });

    app.post('/api/modMyList', function (req, res) {
        console.log("routes.js: app.post /api/modMyList");
        console.log("req.body: " + JSON.stringify(req.body));
        var myPrivate = "Y";      
        if (req.body.view == "Everyone") {
            myPrivate = "N";
        }  
        myList.findByIdAndUpdate( req.body.id, {
            name: req.body.name,
            description: req.body.description,
            owner: req.body.owner,
            grp: req.body.view,
            view: req.body.view,
            private: myPrivate,
            edit: req.body.edit,
            rank: req.body.rank
        }, function (err, myList) {
            if (err) {
                if (err.name === 'MongoError') {
                    console.log("Some other error found!");
                    return res.status(500).send(err);
                }
            } else {
                console.log("req.body.prevListName: " + req.body.prevListName);
                if (req.body.name == req.body.prevListName) {
                    console.log("routes.js: app.post /api/modMyList list name no change");
                } else {
                    console.log("routes.js: app.post /api/modMyList list name changed!!");
                    // update update myItem (list), myItemRank (listName) and MyComment (listName) 
                    //use old list name to find and replace with new list name
                    myUpdateMyItemWList(req.body.prevListName, req.body.name);
                    myUpdateMyItemRankWList(req.body.prevListName, req.body.name);
                    myUpdateMyCommentWList(req.body.prevListName, req.body.name);
                };
                getMyListsOwner(req.body.owner, res);
            }
        });
    });

    app.post('/api/myAdminLists', function (req, res) {
        console.log("routes.js: app.post /api/myAdminLists");
        console.log("req.body: " + JSON.stringify(req.body));
        var myPrivate = "Y";
        //if (req.body.grp == "Everyone" || req.body.grp == "Just Me")
        if (req.body.grp == "Everyone") {
            myPrivate = "N";
        }
        myList.create({
            name: req.body.name,
            description: req.body.description,
            grp: req.body.grp,
            private: myPrivate
        }, function (err, myList) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                   console.log("dup list name found!");
                   return res.status(500).send({ user : req.user, message : "List Name already taken!" });
                } else {
                    console.log("Some other error found!");
                    return res.status(500).send(err);
                }
            } else {
                getMyAdminLists(res);
            }
        });
    });

    app.post('/api/myItems', function (req, res) {
        console.log("routes.js: app.post /api/myItems");
        console.log("req.body: " + JSON.stringify(req.body));
        
        myItem.create({
            name: req.body.name,
            description: req.body.description,
            list: req.body.list,
            owner: req.body.owner
        }, function (err, myList) {
            if (err)
                res.send(err);
            myListItemCntPlus(req.body.list);
            getMyItems(req.body.list, res);
        });
    });

    app.post('/api/myAdminItems', function (req, res) {
        console.log("routes.js: app.post /api/myAdminItems");
        console.log("req.body: " + JSON.stringify(req.body));
        
        myItem.create({
            name: req.body.name,
            description: req.body.description,
            list: req.body.list,
            owner: req.body.owner
        }, function (err, myList) {
            if (err)
                res.send(err);
            myListItemCntPlus(req.body.list);
            getMyAdminItems(req.body.list, res);
        });
    });

    app.post('/api/myItemsRank', function (req, res) {
        console.log("routes.js: app.post /api/myItemsRank");
        console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.user: " + JSON.stringify(req.user));
        // req.body is array of objects.
        // save each items in the array the fields item._id, item.name, item.list and req.user.local.email
        // and a number representing the index or rather 10 for 0, 9 for 1, etc.
        var j = 1;
        for (var i = 0; i < req.body.length; i++) {
            console.log("save: " + req.user.local.email + ":" + req.body[i]._id + ":" + req.body[i].name + ":" + 
            req.body[i].list + ":" + j);
            var savedId = req.body[i]._id;
            myItemRank.create({
                email: req.user.local.email,
                itemId: req.body[i]._id,
                itemName: req.body[i].name,
                listName: req.body[i].list,
                rank: j
            }, function (err, myItemRank) {
                if (err) {
                    res.send(err);
                    return;
                } //else {
                    //console.log("save2: " + savedId + ":" + j);
                    //myItemRankAddMinus(savedId, j, true );
                //}
            });
            j++;
        }
        j = 1;
        for (var i = 0; i < req.body.length; i++) {
            console.log("save: " + req.user.local.email + ":" + req.body[i]._id + ":" + req.body[i].name + ":" + 
            req.body[i].list + ":" + j);
            var savedId = req.body[i]._id;
            console.log("save3: " + savedId + ":" + j);
            myItemRankAddMinus(savedId, j, "Add" );
            j++;
        }
        getMyAdminLists(res);
    });

    app.post('/api/myItemsRankGet', function (req, res) {
        console.log("routes.js: app.post /api/myItemsRankGet");
        //console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.user: " + JSON.stringify(req.user));
        myItemRank.find({
            email: req.user.local.email
        }, function (err, myItemRanks) {
            if (err) {
                res.send(err);
                return;
            } else {
                //console.log("/api/myItemsRankGet " + JSON.stringify(myItemRanks));
                res.json(myItemRanks);
            }
        });
    });

    app.post('/api/myItemsRankRemove', function (req, res) {
        console.log("routes.js: app.post /api/myItemsRankRemove");
        console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.user: " + JSON.stringify(req.user));
        
        myItemRank.find({
            email: req.user.local.email,
            listName : req.body.listName
        }, function (err, myItemRanks) {
            if (err) {
                res.send(err);
                return;
            } else {
                console.log("myItemRanks: " + JSON.stringify(myItemRanks));
                for (var i = 0; i < myItemRanks.length; i++) {
                    console.log("myItemRanks[i].listName: " + myItemRanks[i].listName);
                    console.log("myItemRanks[i].rank: " + myItemRanks[i].rank);
                    console.log("myItemRanks[i].itemName: " + myItemRanks[i].itemName);
                    console.log("myItemRanks[i].itemId: " + myItemRanks[i].itemId);
                    myItemRankAddMinus(myItemRanks[i].itemId, myItemRanks[i].rank, "Remove" );
                }
                myItemRank.remove({
                    email: req.user.local.email,
                    listName : req.body.listName
                }, function (err, myItemRanks) {
                    if (err) {
                        res.send(err);
                        return;
                    } else {
                        //res.json(myItemRanks);
                        getMyAdminLists(res);
                    }
                });
            }
        });
    });

    app.post('/api/modMyItem', function (req, res) {
        console.log("routes.js: app.post /api/modMyItem");
        console.log("req.body: " + JSON.stringify(req.body));
        myItem.findByIdAndUpdate( req.body.listItemId, {
            name: req.body.name,
            description: req.body.description
        }, function (err, myItem) {
            if (err) {
                if (err.name === 'MongoError') {
                    console.log("Some other error found!");
                    return res.status(500).send(err);
                }
            } else {
                //myItemRank.findAndModify({
                  //  query: { itemId : req.body.listItemId },
                  //  update: { itemName: req.body.name }
                //});
                //myItemRank.update({itemId : req.body.listItemId}, {"$set": {"status": "processed" }}, callback);
                myUpdateItemRank(req.body.listItemId, req.body.name);
                getMyItems(req.body.list, res);
            };
        });
    });

    app.post('/api/myDeleteComment', function (req, res) {
        console.log("routes.js delete /api/myListComments/:id " + JSON.stringify(req.params));
        console.log("routes.js delete /api/myListComments/:id req.body: " + JSON.stringify(req.body));
        myComment.remove({
            _id: req.body._id
        }, function (err, myComments) {
            if (err) {
                res.send(err);
            } else {
                myComment.find(function (err, myComments) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(myComments); 
                }).sort({timeStamp : 1}).where({listId : req.body.listId});
            }
        });
    });

    app.post('/api/myGetComments', function (req, res) {
        console.log("routes.js: app.post /api/myGetComments");
        console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.user: " + JSON.stringify(req.user));
        myComment.find(function (err, myComments) {
            if (err) {
                res.send(err);
            }
            res.json(myComments); 
        }).sort({timeStamp : 1}).where({listId : req.body.listId});
    });

    app.post('/api/myListComments', function (req, res) {
        console.log("routes.js: app.post /api/myListComments");
        console.log("req.body: " + JSON.stringify(req.body));
        console.log("req.user: " + JSON.stringify(req.user));
        var date = new Date(); 
        var timestamp = date.getTime();
        myComment.create({
            listId: req.body.listId,
            listName: req.body.listName,
            listOwner: req.body.listOwner,
            ownerEmail: req.body.owner,
            ownerScreenName: req.body.screenName,
            ownerId: req.body.userId,
            comment: req.body.comment,
            timeStamp: timestamp
        }, function (err, myList) {
            if (err) {
                res.send(err);
            } else {
            ////myListItemCntPlus(req.body.list);
            //getMyItems(req.body.list, res);

            // really return list of all comment for this list in timestamp order
             // call function for this and use this function in the get for this also.
             // and after any delete or remove of comments.
              //  return;
                myComment.find(function (err, myComments) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(myComments); 
                }).sort({timeStamp : 1}).where({listId : req.body.listId});
            };
        });
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

// route middleware to ensure user is logged in
function isLoggedInDontCare(req, res, next) {
    //if (req.isAuthenticated())
        return next();

    //res.redirect('/');
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
    //}).sort( {"local.screenName" : 1} ).where ({"local.email": {$nin: usersToExclude}});
    //}).sort( {"local.screenName" : 1} ).where ({"local.email": {$nin: usersToExclude} , "private" : {$ne : "Y"} });
}).sort( {"local.screenName" : 1} ).where ({ "local.private" : "N" , "local.email": {$nin: usersToExclude} } );
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
            console.log("routes.js: getUsersForGrp4 usersToExclude[i] = " + usersToExclude[i] );
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

function getAllPublicGrps(res) {
    //userGrp.find(function (err, userGrps) {
    userGrpDetail.find(function (err, userGrps) {
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).sort( {grp : 1, email : 1} ).where ( { private : "N"}) ;
};

function getUserGrpsA(myEmail, res) {
    console.log("getUserGrpsA reached myEmail: " + myEmail);
    if (myEmail != "admin") {
        userGrp.find(function (err, userGrps) {
            if (err) {
                res.send(err);
            }
            res.json(userGrps); 
        }).sort( {grp : 1, email : 1} ).where ( {email : myEmail, grpOwner : 'Y' }); 
    } else {
        userGrp.find(function (err, userGrps) {
            if (err) {
                res.send(err);
            }
            res.json(userGrps); 
        }).sort( {grp : 1, email : 1} ) ;
    }
};

function getAllMyGrps(myEmail,res) {
    console.log("getAllMyGrps reached myEmail: " + myEmail);
    if (myEmail != "admin") {
        var criteria = {'email': myEmail};
        userGrp.distinct('grp', criteria, function (err, userGrps) {
            if (err) {
                res.send(err);
            }
            res.json(userGrps); 
        }); 
    } else {
        var criteria = {};
        userGrp.distinct('grp', criteria, function (err, userGrps) {
            if (err) {
                res.send(err);
            }
            res.json(userGrps); 
        });
    }
};

function getPubGrps(myEmail, res) {
    console.log("getPubGrps reached myEmail: " + myEmail);
    var grpsToExclude;
    var criteria = {'email': myEmail};
    userGrp.distinct('grp', criteria, function (err, userGrps) {
        if (err) {
            return res.send(err);
        } else {
            grpsToExclude = userGrps;
            if (myEmail != "admin") {
                userGrpDetail.find(function (err, userGrpsDetails) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(userGrpsDetails); 
                }).sort( {grp : 1} ).where ( {private : 'N', "grp": {$nin: grpsToExclude} }); 
            } else {
                userGrpDetail.find(function (err, userGrpsDetails) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(userGrpsDetails); 
                }).sort( {grp : 1} ).where ( { "grp": {$nin: grpsToExclude} } ) ;
            }
        }
    });
};


function getPubGrpsIn(myEmail, res) {
    console.log("getPubGrpsIn reached myEmail: " + myEmail);
    var grpsToInclude;
    var criteria = {'email': myEmail , 'grpOwner' : 'N' };
    userGrp.distinct('grp', criteria, function (err, userGrps) {
        if (err) {
            return res.send(err);
        } else {
            grpsToInclude = userGrps;
            if (myEmail != "admin") {
                userGrpDetail.find(function (err, userGrpsDetails) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(userGrpsDetails); 
                }).sort( {grp : 1} ).where ( {"grp": {$in: grpsToInclude} }); 
            } else {
                userGrpDetail.find(function (err, userGrpsDetails) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(userGrpsDetails); 
                }).sort( {grp : 1} ).where ( { "grp": {$in: grpsToInclude} } ) ;
            }
        }
    });
};


function getPubGrpsOut(myEmail, res) {
    console.log("getPubGrpsOut reached myEmail: " + myEmail);
    var grpsToExclude;
    var criteria = {'email': myEmail};
    userGrp.distinct('grp', criteria, function (err, userGrps) {
        if (err) {
            return res.send(err);
        } else {
            grpsToExclude = userGrps;
            if (myEmail != "admin") {
                userGrpDetail.find(function (err, userGrpsDetails) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(userGrpsDetails); 
                }).sort( {grp : 1} ).where ( {private : 'N', "grp": {$nin: grpsToExclude} }); 
            } else {
                userGrpDetail.find(function (err, userGrpsDetails) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(userGrpsDetails); 
                }).sort( {grp : 1} ).where ( { "grp": {$nin: grpsToExclude} } ) ;
            }
        }
    });
};

function getPubGrpsAll(myEmail, res) {
    console.log("getPubGrps reached myEmail: " + myEmail);
    if (myEmail != "admin") {
        userGrpDetail.find(function (err, userGrpsDetails) {
            if (err) {
                res.send(err);
            }
            res.json(userGrpsDetails); 
        }).sort( {grp : 1} ).where ( {private : 'N' }); 
    } else {
        userGrpDetail.find(function (err, userGrpsDetails) {
            if (err) {
                res.send(err);
            }
            res.json(userGrpsDetails); 
        }).sort( {grp : 1} ) ;
    }
};


function getUserGrpsDetails(res) {
    userGrpDetail.find(function (err, userGrpsDetails) {
        if (err) {
            res.send(err);
        }
        res.json(userGrpsDetails); 
    }).sort( {grp : 1} );
};

function getMyPublicLists(res) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        res.json(myLists); 
    }).sort({name : 1}).where({private : "N"});
};

function getMyLists(res) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        res.json(myLists); 
    });
};

function getMyListsOwner(owner,res) {
    console.log("route.js getMyListsOwner owner = " + owner);
    // get all grps owner is in and use this and owner in where
    var criteria = {'email': owner};
    userGrp.distinct('grp', criteria, function (err, userGrps) {
        if (err) {
               return res.send(err);
        }
            //res.json(userGrps); 
            myList.find(function (err, myLists) {
                if (err) {
                    return res.send(err);
                }
                res.json(myLists); 
            }).sort({name : 1}).where ( { $or: [{owner : owner}, {view : "Everyone"}, {grp : {$in : userGrps} }, 
            {view : {$in : userGrps} }, {edit : {$in : userGrps} }, {rank : {$in : userGrps} } ] } ) ;
        }
    );
};

function getMyAdminListsOwner(owner,res) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        res.json(myLists); 
    }).where ( { "owner" : owner } ) ;
};

function getMyAdminLists(res) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        res.json(myLists); 
    });
};

function getDumpMyComments(res) {
    myComment.find(function (err, myComments) {
        if (err) {
            res.send(err);
        }
        res.json(myComments); 
    });
};

function getDumpMyLogins(res) {
    myLogin.find(function (err, myLogins) {
        if (err) {
            res.send(err);
        }
        res.json(myLogins); 
    });
};

function getDumpMyItemRanks(res) {
    myItemRank.find(function (err, myItemRanks) {
        if (err) {
            res.send(err);
        }
        res.json(myItemRanks); 
    });
};

function getDumpMyItems(res) {
    myItem.find(function (err, myItems) {
        if (err) {
            res.send(err);
        }
        res.json(myItems); 
    });
};

function getDumpMyLists(res) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        res.json(myLists); 
    });
};

function getMyPublicItems(listName, res) {
    myItem.find(function (err, myItems) {
        if (err) {
            res.send(err);
        }
        res.json(myItems); 
    }).where ( { "list": listName } ) ;
};

function getMyItems(listName, res) {
    myItem.find(function (err, myItems) {
        if (err) {
            res.send(err);
        }
        res.json(myItems); 
    }).where ( { "list": listName } ) ;
};

function getMyAdminItems(listName, res) {
    myItem.find(function (err, myItems) {
        if (err) {
            res.send(err);
        }
        res.json(myItems); 
    }).where ( { "list": listName } ) ;
};

function getUserGrpsDetailsForUser(myEmail, res) {
    console.log("getUserGrpsDetailsForUser reached myEmail: " + myEmail);
    if (myEmail != "admin") {
        var grpsToInclude;
        var criteria = {'email': myEmail, grpOwner : 'Y'};
        userGrp.distinct('grp', criteria, function (err, userGrps) {
            if (err) return res.send(err);
            grpsToInclude = userGrps;
            for (var i = 0; i < grpsToInclude.length; i++ ) {
                console.log("routes.js: getUserGrpsDetailsForUser grpsToInclude[i] = " + grpsToInclude[i] );
            }
            userGrpDetail.find(function (err, userGrpsDetails) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(userGrpsDetails); 
                }
            }).sort( {grp : 1} ).where ({"grp": {$in: grpsToInclude}});
        });
    } else {
        userGrpDetail.find(function (err, userGrpsDetails) {
            if (err) {
                res.send(err);
            } else {
                res.json(userGrpsDetails); 
            }
        }).sort( {grp : 1} );
    }
};

function getUserGrpsDetails_saved(res) {
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
    var grpDetail = "";
    var grpPrivate = "";
    userGrpDetail.find(function (err, userGrpsDetailsX) {
        if (err) {
            return res.send(err);
        }
        //res.json(userGrpsDetailsA); 
        console.log("getUerGrpsB userGrpsDetailsX " + JSON.stringify(userGrpsDetailsX));
        grpDetail = userGrpsDetailsX[0].detail;
        grpPrivate = userGrpsDetailsX[0].private;

        userGrp.find(function (err, userGrps) {
            if (err) {
                res.send(err);
            }
            userGrps[userGrps.length] = grpDetail;
            userGrps[userGrps.length] = grpPrivate;
            console.log("getUerGrpsB " + JSON.stringify(userGrps));
            res.json(userGrps); 
        }).sort( {grp : 1, email : 1} ).where ( {grp : mygrp_id} ) ;
     
    }).where ( {grp : mygrp_id} ) ;
    
    //var query = { grp: mygrp_id };
    ////userGrp.find(function (err, userGrps) {
        ////if (err) {
            ////res.send(err);
        ////}
        //console.log("getUerGrpsB userGrps[0] " + JSON.stringify(userGrps[0]));
        //userGrps[0].push = {"grpDetail" : "details of grp goes here" }; //, "grpPrivate" : "private goes here"};
        //userGrps[userGrps.length] = "details of grp goes here";
        //userGrps[userGrps.length] = "private or not of grp goes here";
        ////userGrps[userGrps.length] = grpDetail;
        ////userGrps[userGrps.length] = grpPrivate;
        //userGrps[0].grpDetail = "details of grp goes here";
        //userGrps[0].grpPrivate = "private goes here";
        //console.log("getUerGrpsB userGrps[0] " + JSON.stringify(userGrps[0]));
        ////console.log("getUerGrpsB " + JSON.stringify(userGrps));
        ////res.json(userGrps); 
    ////}).sort( {grp : 1, email : 1} ).where ( {grp : mygrp_id} ) ;
};

function getUserGrpOwners(mygrp_id, res) {
    userGrp.find(function (err, userGrps) {
        if (err) {
            res.send(err);
        }
        res.json(userGrps); 
    }).sort( {grp : 1, email : 1} ).where ( {grp : mygrp_id, grpOwner : "Y"} ) ;
};

function deleteGrp(grp, req, res) {
    userGrp.remove({ grp : grp }, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            //getUserGrpsA(res);
            userGrpDetail.remove({ grp : grp }, function (err, user) {
                if (err) {
                    res.send(err);
                } else {
                    // getUserGrpsDetails(res);
                    getUserGrpsA(req.user.local.email,res);
                }
            });
        }
    });
};

function deleteGrpDetail(grp, req, res) {
    userGrpDetail.remove({ grp : grp }, function (err, user) {
        if (err)
            res.send(err);
        //getUserGrpsDetails(res);
        getUserGrpsDetailsForUser(req.user.local.email, res);
    });
};

function deleteGrpDetailA(grp, req, res) {
    userGrpDetail.remove({ grp : grp }, function (err, user) {
        if (err)
            res.send(err);
        //getUserGrpsDetailsA(res);
        getUserGrpsDetailsForUser(req.user.local.email, res);
    });
};

function onSelfDelete() {
    if (confirm('Are you sure to delete this record ?') == true) {
        console.log("onSelfDelete yes delete");
    } else {
        console.log("onSelfDelete No delete");
    }
};

function myListItemCntPlus(listName) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        console.log("myListItemCntPlus " + JSON.stringify(myLists));
        console.log("itemCnt = " + myLists[0].itemCnt)
        //var itemCnt = parseInt(myLists[0].itemCnt, 10) + 1;
        var itemCnt = myLists[0].itemCnt + 1;
        console.log("listName = " + listName + " itemCnt = " + itemCnt);
        
        myList.findByIdAndUpdate(myLists[0]._id,   { itemCnt: itemCnt} , function (err, myLists) {
              if (err) {
                  console.log("error");
              //    //res.send(err);
              } else {
                  console.log("no error");
              } } ) ;
    }).where ( { "name": listName } ) ;
};

function myListItemCntMinus(listName) {
    myList.find(function (err, myLists) {
        if (err) {
            res.send(err);
        }
        console.log("myListItemCntMinus " + JSON.stringify(myLists));
        console.log("itemCnt = " + myLists[0].itemCnt)
        //var itemCnt = parseInt(myLists[0].itemCnt, 10) - 1;
        var itemCnt = myLists[0].itemCnt - 1;
        console.log("listName = " + listName + " itemCnt = " + itemCnt);
        
        myList.findByIdAndUpdate(myLists[0]._id,   { itemCnt: itemCnt} , function (err, myLists) {
              if (err) {
                  console.log("error");
              //    //res.send(err);
              } else {
                  console.log("no error");
              } } ) ;
    }).where ( { "name": listName } ) ;
};

function myRankAlgorithm(myRank) {
    if (myRank == 1) { return 10; };
    if (myRank == 2) { return 9; };
    if (myRank == 3) { return 8; };
    if (myRank == 4) { return 7; };
    if (myRank == 5) { return 6; };
    if (myRank == 6) { return 5; };
    if (myRank == 7) { return 4; };
    if (myRank == 8) { return 3; };
    if (myRank == 9) { return 2; };
    if (myRank == 10) { return 1; };
}

function myItemRankAddMinus(myItemId, myRank, addOrMinus ) {
    console.log("myItemRankAddMinus myItemId: " + myItemId + " myRank: " + myRank + " AddOrMinus: " + addOrMinus);
    myItem.find(function (err, myItems) {
        if (err) {
            res.send(err);
            return;
        }
        console.log("myItemRankAddMinus " + JSON.stringify(myItems));
        if (myItems.length > 0) {
            console.log("rank = " + myItems[0].rank)
            var newRank = 0;
            if (addOrMinus == "Add") {
                //newRank = parseInt(myItems[0].rank, 10) + myRankAlgorithm(myRank);
                newRank = myItems[0].rank + myRankAlgorithm(myRank);
            } else {
                //newRank = parseInt(myItems[0].rank, 10) - myRankAlgorithm(myRank);
                newRank = myItems[0].rank - myRankAlgorithm(myRank);
            }
            console.log("myItemId = " + myItemId + " newRank = " + newRank );
        
            myItem.findByIdAndUpdate(myItemId,   { rank: newRank} , function (err, myLists) {
                if (err) {
                    console.log("error");
                    return;
              //    //res.send(err);
                } else {
                    console.log("no error");
                } } ) ;
        }
    }).where ( { "_id": myItemId } ) ;
};

function myUpdateItemRank(myItemId, myItemName) {
    myItemRank.find(function (err, myRankItems) {
        if (err) {
            res.send(err);
            return;
        } else {
            console.log("myUpdateItemRank " + JSON.stringify(myRankItems));
            for (var i = 0; i < myRankItems.length; i++) {
                myItemRank.findByIdAndUpdate(myRankItems[i]._id, { itemName: myItemName }, function (err, myRankItems) {
                    if (err) {
                        console.log("error");
                        return;
                    } else {
                        console.log("no error");
                    } } ) ;
            }
        }
    }).where ( { "itemId": myItemId } ) ;
};

function myUpdateMyItemWList(prevListName, newListName) {
    myItem.find(function (err, myItems) {
        if (err) {
            res.send(err);
            return;
        } else {
            console.log("myUpdateMyItemWList " + JSON.stringify(myItems));
            for (var i = 0; i < myItems.length; i++) {
                myItem.findByIdAndUpdate(myItems[i]._id, { list: newListName }, function (err, myItems) {
                    if (err) {
                        console.log("error");
                        return;
                    } else {
                        console.log("no error");
                    } } ) ;
            }
        }
    }).where ( { "list" : prevListName } ) ;
};

function myUpdateMyItemRankWList(prevListName, newListName)  {
    myItemRank.find(function (err, myRankItems) {
    if (err) {
        res.send(err);
        return;
    } else {
        console.log("myUpdateMyItemRankWList " + JSON.stringify(myRankItems));
        for (var i = 0; i < myRankItems.length; i++) {
            myItemRank.findByIdAndUpdate(myRankItems[i]._id, { listName: newListName }, function (err, myRankItems) {
                if (err) {
                    console.log("error");
                    return;
                } else {
                    console.log("no error");
                } } ) ;
        }
    }
    }).where ( { "listName" : prevListName } ) ;
};

function myUpdateMyCommentWList(prevListName, newListName)  {
    myComment.find(function (err, myComments) {
    if (err) {
        res.send(err);
        return;
    } else {
        console.log("myUpdateMyCommentWList " + JSON.stringify(myComments));
        for (var i = 0; i < myComments.length; i++) {
            myComment.findByIdAndUpdate(myComments[i]._id, { listName: newListName }, function (err, myComments) {
                if (err) {
                    console.log("error");
                    return;
                } else {
                    console.log("no error");
                } } ) ;
        }
    }
    }).where ( { "listName" : prevListName } ) ;
};

function myItemRankRemove(myItemId, myListName ) {
    myItemRank.remove({
        //email: req.user.local.email,
        itemId : myItemId,
        listName : myListName
    }, function (err, myItemRanks) {
        if (err) {
            res.send(err);
            return;
        } else {
            //res.json(myItemRanks);
            //getMyAdminLists(res);
            return;
        }
    });
};
// After adding user to group want to reload page to get all users in all groups '
// and also users still in selected group
// This loads the usergrps.ejs page from the Admin screen
//    app.get('/api/userGrps', function (req, res) {
//    getUserGrps(res);
//});