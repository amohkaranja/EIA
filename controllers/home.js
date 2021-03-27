const User = require('../models/user');

const bcrypt= require('bcrypt');

const crypto = require('crypto');

const nodemailer= require('nodemailer');

const transporter =nodemailer.createTransport({
  service : 'gmail',
  auth :{
    user:'amosdkaranja@gmail.com',
    pass:'0798230245'
  },
  tls: {
    rejectUnauthorized: false
}
 
});

exports.getIndex= (req,res,next) =>{
    res.render('index', {
        pageTitle: 'home',
        path: '/',
        isAuthenticated: false,
        linkMessage: req.flash('linkMessage'),
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
          const mailOptions = {
            from: 'amosdkaranja@gmail.com',
            to: email,
            subject: 'Welcome on board',
            html: `
            <p><b>Endeavors Insuarance Agency Welcomes you board!</b></p>
            <p>Please reset your password, and rememeber to set a strong password Hacking is real!</p>
            <P> Click this <a href="http://localhost:3000/reset">link</a> to reset Your password </p>
       `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          
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
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
    })
    .then(result=>{
      const mailOptions = {
        from: 'amosdkaranja@gmail.com',
        to: email,
        subject: 'Reset Password Request',
        html: `
             <p> You requested a password reset</p>
             <P> Click this <a href="http://localhost:3000/newPassword/${token}">link</a> to reset Your password. 
             This link expires after one hour. </p>
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      req.flash('linkMessage','check your email', email, 'to reset your password');
      res.redirect('/');
    })
    .catch(err=>{console.log(err)})
  });
};
exports.getNewpassword=(req,res,next)=>{
  const token = req.params.token;
  User.findOne({where:{resetToken: token,}})
  .then(user=>{
    res.render('newPassword', {
      pageTitle: 'reset Password',
      path: '/newPassword',
      isAuthenticated: false,
      successMessage: req.flash('successMessage'),
      passwordError:req.flash('passwordError'),
      userId: user.id.toString(),
      passwordToken: token
    })
  })
  .catch(err=>{console.log(err)})

    
};
exports.postNewPassword=(req,res,next)=>{
  console.log("i am here what next");
  const newPassword = req.body.password;
  const confirm =  req.body.confirm;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({where:{resetToken:passwordToken,id:userId}})
  .then(user=>{
    resetUser = user;
    if(!newPassword===confirm){
       req.flash('passwordError','The new password does not match. please enter the same new password as confirm password and try again!');
      return res.redirect('/newPassword');
    }else{
      return bcrypt.hash(newPassword, 12);
    }
  }).then(hashedPassword=>{
    resetUser.password= hashedPassword;
    resetUser.resetToken= null;
    resetUser.resetTokenExpiration =null;
    return resetUser.save();

  }).then(result=>{
    req.flash('successMessage','You have succesifully changed your password! please click home page link to login ');
    return res.redirect('/newPassword');
  })
  .catch(err=>{console.log(err)})
  
}