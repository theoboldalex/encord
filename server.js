const express = require('express');
const app = express();
require('dotenv').config();

//CONFIG//
app.set('view engine', 'ejs');
app.use(express.static('public'));

//ROUTES//
app.get('/', (req, res) => {
  res.render('index');
});

//SERVER//
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
