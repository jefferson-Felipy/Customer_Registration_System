module.exports = {
    eAdmin: function(req,res,next){
        if(req.isAuthenticated() && req.user.eAdmin == 1)
        {
            return next();
        }

        req.flash("error_adm","Voce precisa fazer login para ter acesso ao crud!");
        res.redirect('/login');
    }
}