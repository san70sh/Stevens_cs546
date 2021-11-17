const conMethod = (app) => {
    app.use('/', (req, res) => {
        res.render("palindrome/checker", {title: "Palindrome CheckSite"});
    });
    app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = {
    conMethod
};