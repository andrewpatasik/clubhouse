const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

const indexRoute = require('./routes/index');

app.use(expressLayouts);
app.set('layout', './layouts/default')
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running at port 3000')
})