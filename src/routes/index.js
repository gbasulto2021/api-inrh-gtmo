const express = require("express");
const routes = express.Router();

const { registerNewUser, userAuth} = require("../controllers/usersController");
const {getReports, addReport, getOneReport } = require("../controllers/reportsController");
const { validateCreate } = require("../validators/newReport");

const {opAuth} = require("../middlewares/opAuth");
const { validateDuplicate } = require("../middlewares/validateDuplicate");

routes.get("/", (req,res)=>{
    res.send("Home Page")
})
routes.get("/form", (req,res)=>{
    res.send("Form Page")
})


routes.get("/reports",opAuth,getReports)

routes.post("/register",opAuth, registerNewUser);

routes.post("/auth", userAuth);

routes.post("/new-report",validateDuplicate, validateCreate, addReport)

routes.get("/report", opAuth,getOneReport)

routes.get("/logout", (req, res) => {
        req.session.destroy(() => {
          res.redirect("/login");
        });
      });


module.exports = routes;