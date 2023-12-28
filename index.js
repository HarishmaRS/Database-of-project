const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const app = express();
const port = 8080;
const host = 'localhost';
const routes = require('./View/view');
const uri = 'mongodb+srv://HarishmaRS:Karthu%408@cluster0.wxxxfpp.mongodb.net/newDB?retryWrites=true&w=majority'
// Middleware to handle json data
app.use(express.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
    next();
})
// Navigate all req to router
app.use('/',routes);
// Connect to Database and starting server
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})

.then(() => {
    app.listen(process.env.PORT || port,host,() => {
        console.log(`Server running at http://${host}:${port}`);
    });
}).
catch((err) => {
    console.log(err);
}
)