const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes.conMethod(app);

app.listen(3000, () => {
    console.log("We now have a server.");
    console.log('Your routes will be running on http://localhost:3000');
});
