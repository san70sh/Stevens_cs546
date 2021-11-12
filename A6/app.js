const express = require('express');
const app = express();
const configRoutes = require('./routes');

app.use(express.json());

configRoutes(app);
try{
    app.listen(3000, () => {
        console.log('Your routes will be running on http://localhost:3000');
    });
} catch(e) {
    console.log("Error while starting server.");
}
