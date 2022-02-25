// const path = require('path') ;
const express = require( 'express');
const dotenv = require('dotenv') ;
const morgan  = require('morgan') ;
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
// const multer = require('multer') ;

// const connection = require('../backend/config/db.js');
const userRoute = require('./routes/userRouter.js')
const AdminGarageRouter = require('./routes/AdminGarageRouter');

dotenv.config()


const PORT = process.env.PORT || 5000;
const app = express();


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use('/',userRoute)

app.use(AdminGarageRouter);

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
)