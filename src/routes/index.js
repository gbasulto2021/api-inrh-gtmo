const express = require("express");
const routes = express.Router();

const { registerNewUser, userAuth} = require("../controllers/usersController");
const {getReports, addReport, getOneReport, updateReport, findOneReport, deleteReport } = require("../controllers/reportsController");
const { validateCreate } = require("../validators/newReport");

const {opAuth} = require("../middlewares/opAuth");
const { validateDuplicate } = require("../middlewares/validateDuplicate");

routes.get("/", (req,res)=>{
    res.send("Home Page")
})
routes.get("/form",(req,res)=>{
    res.send("Form Page")
})

routes.get("/register", opAuth,(req,res)=>{
  res.send("Register Page")
})

routes.get("/reports",getReports)

routes.post("/register",registerNewUser);

routes.post("/auth", userAuth);

routes.post("/new-report",validateDuplicate, validateCreate, addReport)

routes.get("/report", getOneReport)

routes.get("/report/:id",findOneReport)

routes.put("/update/:id", updateReport)

routes.delete("/delete/:id",deleteReport)

routes.get("/logout", (req, res) => {
  console.log("Cerrado")
        req.session.destroy(() => {
          res.redirect("/login");
        });
      });


module.exports = routes;