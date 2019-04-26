var express = require('express');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs');

var WassupUserCollection = require('../models/WassupUserSchema');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;





var isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
};
var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  WassupUserCollection.findById(id, function (err, user) {
    done(err, user);
  });
});



passport.use('signUp', new LocalStrategy(
    {passReqToCallback: true},
    function (req, username, password, done) {
      findOrCreateUser = function () {
        WassupUserCollection.findOne({'username': username}, (errors, user) => {
          if (user) {
            return done(null, false, {message: 'Already Existing User'});
          } else {
            var newUser = new WassupUserCollection();

            newUser.username = username;
            newUser.password = createHash(password);
            newUser.profilePic = req.body.profilePic;
            newUser.backgroundPic = req.body.backgroundPic;

            newUser.save((errors) => {
              if (errors) {
                throw errors;
              }
              return done(null, newUser);
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
);

router.post('/signUp',
    passport.authenticate('signUp',
        { successRedirect: '/users/signUpsuccess',
            failureRedirect: '/users/signUpfail'
        }
    ), (req, res) => {
      res.send(req.body.username)
    });

router.get('/signUpfail', (req, res) => {
  res.send("Sign Up failed. Please try again. ");
});

router.get('/signUpsuccess', (req, res) => {
    console.log('sucess redirect point hit');
  res.send("Your account has been created!!! Come on sign in and tell us Wassup!! ");
});

passport.use(new LocalStrategy(
    function (username, password, done) {
      WassupUserCollection.findOne({username: username}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Username incorrect. Please Try again.'});
        }
        if (!isValidPassword(user, password)) {
          return done(null, false, {message: 'Password incorrect. Please try again.'});
        }
        return done(null, user, {user: user.username});
      });
    }
));

router.post('/login',
    passport.authenticate('local',
        {failureRedirect: '/users/loginFail'}),

    function (req, res) {
      req.session.username = req.body.username;
      res.send(req.session.username);
    });


router.get('/loginFail', (req, res) => {
  res.send(undefined);
});

router.get('/logout', (req, res) => {
  req.session = null;
    res.send('Log Out Successful! Come back soon!')
});


router.post('/addPost', (req, res) => {
  WassupUserCollection.findOneAndUpdate({username: req.body.username},
      {$push: {wassupPost: req.body}}, (errors) => {
        if (errors) res.send(errors);
        else res.send("Wassup Post Successful!");
      });
});

router.post('/editPost', (req,res)=>{
    WassupUserCollection.findOneAndUpdate(
        {_id: req.body.wassupPost},
        {
            $set: {
                'postBody.$': req.body.postBody,
                'postImage.$': req.body.postImage,
                'postPublic.$': req.body.postPublic,
            }
        },
        (errors, results)=>{
            if(errors) res.send(errors);
            else res.send("Post updated suckseccfully");
        });
});

router.get('/grabPost', (req, res) => {
  WassupUserCollection.find({}, (errors, results) => {
    if (errors) res.send(errors);
    else {
      res.send(results)
    }
  })
});


router.post('/searchUsers', (req, res) => {
  WassupUserCollection.findOne({username: req.body.username}, (errors, results) => {
    if (errors) res.send(errors);
    else {
      res.send(results);
      console.log(results)
    }
  })
});

router.post('/search', (req, res) => {
    WassupUserCollection.find(
        {"wassupPost.postBody": {"$regex": req.body.searchBar, "$options": "i"}}, (errors, results) => {
            if (errors) res.send(errors);
            else {
                let allresults = [];
                let searchResults = [];
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < results[i].wassupPost.length; j++) {
                        allresults.push(
                            {
                                postBody:results[i].wassupPost[j].postBody,
                                postImage:results[i].wassupPost[j].postImage,
                            }
                        )
                    }
                }
                for(let i=0; i<allresults.length; i++){
                    if(allresults[i].postBody.includes(req.body.searchBar)){
                        searchResults.push(allresults[i])
                    }
                }
                res.send(searchResults);
            }
        })
});

module.exports = router;