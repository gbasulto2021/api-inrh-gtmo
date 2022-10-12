const opAuth = (req,res,next)=>{
  console.log(req.session.loggedin)
    if (req.session.loggedin) {
        next() 
         
       } else {
         req.session.prevRoute = req.path;
         res.redirect("/login");
       }
}

module.exports = {opAuth};
