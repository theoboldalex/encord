const express = require('express');
const app = express();
const router = require('./router');
require('dotenv').config();

//CONFIG//
app.set('view engine', 'ejs');
app.use(express.static('public'));

//ROUTES//
app.use('/', router);

//SERVER//
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
