const express = require('express');

const bodyParser= require('body-parser');

const path = require('path');

const session = require('express-session');

const flash = require('connect-flash');

const nodemailer = require('nodemailer');

const User = require('./models/user');

const sequelize = require('./util/database');

const  SequelizeStore = require('connect-session-sequelize')(session.Store);

const allRoutes= require('./routes/home')

const app = express();

app.set('view engine','ejs');

app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'endeavors',
     resave: false, 
     saveUninitialized: false,
     store: new SequelizeStore({db:sequelize,}),
     resave: false,
     proxy:true
    }));
app.use(flash());

app.use(allRoutes);

app.use(express.static(path.join(__dirname,'public')));



sequelize
//.sync({force : true})
.sync()

.then( callback=>{
    app.listen(3000) 
})
.catch(
    
    err=>{ console.log(err)
    });
