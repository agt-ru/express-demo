const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const logger = require("./middleware/logger");
const members = require('./Members');

const app = express();

// send a static webpage
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// using custom middleware
// app.use(logger);

// ejs, express-handlebars -- are used to render templates
// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser middleware
app.use(express.json());

// handle form submissions
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.render('index', {
  title: 'Members App',
  members
}));

// set static folder
// app.use(express.static(path.join(__dirname, "public")));

// members api routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
