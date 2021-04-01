const User = require('../models/user');

const bcrypt= require('bcrypt');

const crypto = require('crypto');

const nodemailer= require('nodemailer');
const { reset } = require('nodemon');

// const transporter =nodemailer.createTransport({
//   service : 'gmail',
//   auth :{
//     user:'amosdkaranja@gmail.com',
//     pass:'0798230245'
//   },
//   tls: {
//     rejectUnauthorized: false
// }
 
// });

exports.getIndex= (req,res,next) =>{
    res.render('index', {
        pageTitle: 'home',
        path: '/',
        isAuthenticated: false,
        linkMessage: req.flash('linkMessage'),
        errorMessage: req.flash('error'),
        successMessage: req.flash('successMessage'),
        resetNull: req.flash('resetNull')
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
    const endeavor= "1234"
  const password = endeavor;
  const phoneNumber= req.body.phoneNumber;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  User.findOne({where:{email: email}})
    .then(user => {
      if (user) {
        req.flash('email-error','username or email already exist!');
        return res.redirect('/new-user');
      }
    }).then(result=>{

      const user = new User({
        email: email,
        password: password,
        phoneNumber:phoneNumber,
        firstName:firstName,
        lastName:lastName
      });
      return user.save();

    }).then(aftersave=>{
      res.redirect('/new-user');
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
exports.getReset=(req,res,next)=>{
  res.render('reset', {
    pageTitle: 'reset',
    path: '/reset',
    isAuthenticated: false,
    errorMessage: req.flash('resetError')
    

})
};
exports.postReset=(req,res,next)=>{
  const email = req.body.email;
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
      return res.redirect('/');
    }
    const token = buffer.toString('hex')
    User.findOne({where:{email:email}}).then(user=>{
      if (!user) {
                req.flash('resetError','The email you have eneterd does not exist!');
              return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration= Date.now() + 3600000;
            return user.save();
    })
    .then(result=>{
      res.redirect(`/reset/${token}`);
    })
    .catch(err=>{console.log(err)})
  });
};
exports.getNewpassword=(req,res,next)=>{
  const token = req.params.token;
  User.findOne({where:{resetToken: token,}})
  .then(user=>{
    const resetFlag =user.resetFlag;
    console.log(resetFlag);
    if(resetFlag===1){
      req.flash('resetNull','Contact your admin to get a reset password permission!');
      return res.redirect('/')
    }
    res.render('newPassword', {
      pageTitle: 'newPassword',
      path: '/newPassword',
      isAuthenticated: false,
      
      passwordError:req.flash('passwordError'),
      userId : user._id.toString(),
      passwordToken: token
    })
  })
  .catch(err=>{console.log(err)})

    
};
exports.postNewPassword=(req,res,next)=>{
  const newPassword = req.body.password;
  const confirm =  req.body.confirm;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({where:{resetToken:passwordToken}})
  .then(user => {
    if (confirm!=newPassword) {
      req.flash('passwordError','Your passwowrd does not match, refresh and try again');
       return res.redirect(`/reset/${passwordToken}`)
      
    }
    resetUser = user;
    return bcrypt.hash(newPassword,12);
  }).then(hashedPassword=>{
    resetUser.password= hashedPassword;
    resetUser.resetToken= null;
    resetUser.resetTokenExpiration =null;
    resetUser.resetFlag = '1'
    return resetUser.save()
  }).then(aftersave=>{
    req.flash('successMessage','You have succesifully changed your password!');
    return res.redirect('/')
  })
  .catch(err => {
    console.log(err);
  });
};
exports.getUserProfile= (req,res,next) =>{
  res.render('user-profile-view', {
      pageTitle: 'user-profile',
      path: '/user-profile-view',
      isAuthenticated: req.session.isLoggedIn,
})
};
exports.getManageUsers= (req,res,next) =>{
  res.render('manage-users', {
      pageTitle: 'manage-users',
      path: '/manage-users',
      isAuthenticated: req.session.isLoggedIn,
})
};
exports.getLogs= (req,res,next) =>{
  res.render('logs', {
      pageTitle: 'logs',
      path: '/logs',
      isAuthenticated: req.session.isLoggedIn,
})
};