const Client = require('../models/client');

exports.getNewClient= (req,res,next) =>{
    res.render('new-client', {
        pageTitle: 'new-client',
        path: '/new-client',
        isAuthenticated: req.session.isLoggedIn,
        emailError: req.flash('emailError'),
        fileError: req.flash('fileError')
})
};
exports.getClientProfile= (req,res,next) =>{
    res.render('client-profile', {
        pageTitle: 'client-profile',
        path: '/client-profile',
        isAuthenticated: req.session.isLoggedIn,
})
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
  const regNumber=  req.body.regNumber;
  const kraCert= req.file;
  const idCopy = req.body.idCopy;
  const incopCert = req.body.incopCert;
   if(!kraCert){
    req.flash('fileError','Attached file is not an image!');
    return res.redirect('/new-client');
   }
  Client.findOne({where:{email: email}})
  .then(client => {
    if (client) {
      req.flash('emailError','client with  this email already exist!');
      return res.redirect('/new-client');
    }
  }).then(result=>{
       const kraCertPath =kraCert.path;
    const client = new Client({
      email: email,
      phoneNumber:phoneNumber,
      firstName:firstName,
      lastName:lastName,
      city: city,
      country:country,
      boxOffice:boxOffice,
      idNumber: idNumber,
      businessType:businessType,
      businessNature:businessNature,
      kraCert:kraCertPath,
      pin:pin,
      regNumber:regNumber,
    //   kraCert:kraCert,
      idCopy:idCopy,
      incopCert: incopCert,
    });
    return client.save();

  }).then(aftersave=>{
    res.redirect('/new-client');
  })
  .catch(err => {
    console.log(err);
  });



};