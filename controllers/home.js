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
exports.postCreate=(req,res,next)=>{
    const email = req.body.email;
  const password = req.body.password;
  const phoneNumber= req.body.phoneNumber;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  // const confirmPassword = req.body.confirmPassword;
  User.findOne({where:{email: email}})
    .then(user => {
      if (user) {
        req.flash('email-error','username or email already exist!');
        return res.redirect('/new-user');
        
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            phoneNumber:phoneNumber,
            firstName:firstName,
            lastName:lastName
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/new-user');
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
  const email = req.params.email
  User.findByPk(email)
  .then(user=>{
    console.log(email)
      res.render('dashboard', {
        user:user,
        pageTitle: 'dashboard',
        path: '/dashboard',
        isAuthenticated: req.session.isLoggedIn
  }
  ).catch(err=>{console.log(err)});
    
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
exports.getAdmin = (req,res,next) =>{
  res.render('admin', {
    pageTitle: 'admin',
    path: '/admin',
    isAuthenticated: req.session.isLoggedIn
})
};
exports.getNewUser = (req,res,next) =>{
  User.findAll()
  .then(users=>{
    res.render('new-user', {
      users: users,
      pageTitle: 'new-user',
      path: '/new-user',
      isAuthenticated: req.session.isLoggedIn,
      errorMessage: req.flash('email-error')
  })
  .catch(err=>{console.log(err)});
 
})
};