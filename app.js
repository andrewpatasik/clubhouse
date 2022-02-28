const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => { res.render('index', {
  title: "Discuss With Like-Minded People | Clubhouse",
})
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running at port 3000')
})