const User = require('../models/user');

const bcrypt= require('bcrypt');


exports.getIndex= (req,res,next) =>{
    res.render('index', {
        pageTitle: 'home',
        path: '/',
        isAuthenticated: false,
        errorMessage: req.flash('error')
})
};
exports.getSignup= (req,res,next) =>{
    res.render('signup', {
        pageTitle: 'signup',
        path: '/signup',
        isAuthenticated: false
})
};
exports.postSignup=(req,res,next)=>{
    const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({where:{email: email}})
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/');
        });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postLogin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({where:{ email: email }})
      .then(user => {
        if (!user) {
            req.flash('error','Invalid email or Password!');
          return res.redirect('/');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/dashboard');
              });
            }
            req.flash('error','Invalid email or Password!');
            res.redirect('/');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/');
          });
      })
      .catch(err => console.log(err)); 
};
exports.getDashboard=(req,res,next)=>{
    res.render('dashboard', {
        pageTitle: 'dashboard',
        path: '/dashboard',
        isAuthenticated: req.session.isLoggedIn
})
};
exports.getUnderwriting= (req,res,next)=>{
    res.render('underwriting', {
        pageTitle: 'underwriting',
        path: '/underwriting',
        isAuthenticated: req.session.isLoggedIn
})
};
exports.getMvdetails= (req,res,next)=>{
    res.render('mv-details', {
        pageTitle: 'mv-details',
        path: '/mv-details',
        isAuthenticated: req.session.isLoggedIn
}) 

};

exports.getNewpolicy= (req,res,next)=>{
    res.render('new-policy', {
        pageTitle: 'new-policy',
        path: '/new-policy',
        isAuthenticated: req.session.isLoggedIn
})

};

exports.postLogout =(req,res,next)=>{
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect('/');
    })

  
};