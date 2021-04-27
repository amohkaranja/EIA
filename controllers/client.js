const Client = require('../models/client');

const fs = require('fs');

const path = require('path');

exports.getNewClient= (req,res,next) =>{
  const user = req.user;
const userName =  "Hello"+ " "  + user.firstName +"!";
    res.render('new-client', {
      userName:userName,
        pageTitle: 'new-client',
        path: '/new-client',
        isAuthenticated: req.session.isLoggedIn,
        emailError: req.flash('emailError'),
        fileError: req.flash('fileError')
})
};
exports.getClientProfile= (req,res,next) =>{
  const user = req.user;
const userName =  "Hello"+ " "  + user.firstName +"!";

const clientId = req.params.clientId;
Client.findByPk(clientId)
.then(myclient=>{
        if(!myclient){

          req.flash('fetchError','Unable to get user!');
          return res.redirect('/dashboard')
        }
        res.render('client-profile',{
          userName:userName ,
            pageTitle: 'client-profile',
            path:'/client-profile',
            myclient: myclient,
            updateSuccess: req.flash('updateSuccess'),
            resetSuccess: req.flash('resetSuccess'),
            isAuthenticated: req.session.isLoggedIn
        });
    }
).catch(err=> console.log(err));
};
exports.postClient=(req,res,next)=>{
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber= req.body.phoneNumber;
  const city= req.body.city;
  const country= req.body.country;
  const boxOffice= req.body.boxOffice;
  const email = req.body.email;
  const idNumber= req.body.idNumber;
  const businessType= req.body.businessType;
  const businessNature = req.body.businessNature;
  const pin = req.body.pin;
  const regNumber=  "EIA/CP/08/2021";
  const kraCert= req.file;
  const idCopy = req.file;
  const level = req.body.level;
  const occupation = req.body.occupation;
  const contactPerson = req.body.contactPerson;
  const contactPersonNumber = req.body.contactPersonNumber;
  console.log(kraCert + idCopy);
   if(!kraCert){
    req.flash('fileError','Attached file is not an image!');
    return res.redirect('/new-client');
   };
   if(!idCopy){
    req.flash('fileError','Attached file is not an image!');
    return res.redirect('/new-client');
   };
  
  Client.findOne({where:{email: email}})
  .then(client => {
    if (client) {
      req.flash('emailError','client with  this email already exist!');
      return res.redirect('/new-client');
    }
  }).then(result=>{
       const kraCertPath =kraCert.path;
       const idCopyPath = idCopy.path;
    const client = new Client({
      email: email,
      phoneNumber:phoneNumber,
      firstName:firstName,
      lastName:lastName,
      town: city,
      regNumber:regNumber,
      country:country,
      boxOffice:boxOffice,
      idNumber: idNumber,
      businessType:businessType,
      businessNature:businessNature,
      kraCert:kraCertPath,
      pin:pin,
      regNumber:regNumber,
      idCopy:idCopyPath,
      level:level,
      occupation:occupation,
      contactPerson: contactPerson,
      contactPersonNumber: contactPersonNumber
  
    });
    return client.save();

  }).then(aftersave=>{
    res.redirect('/new-client');
  })
  .catch(err => {
    console.log(err);
  });



};
exports.getKraCert = (req,res,next)=>{
const myclientId= req.params.myclientId;
Client.findOne({where:{id :myclientId}}).then(client=>{
  const kraCertPath = path.join('images',client.kraCert);
  fs.readFile(kraCertPath,(err,data)=>{
    if(err){
      return next (err);
    }
    res.setHeader('content-Type','application/image')
    res.send(data);
  })
})

}