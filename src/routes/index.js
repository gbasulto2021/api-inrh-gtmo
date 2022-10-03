const express = require("express");
const routes = express.Router();

const { registerNewUser, userAuth} = require("../controllers/usersController");
const {getReports, addReport, getOneReport } = require("../controllers/reportsController");
const { validateCreate } = require("../validators/newReport");

routes.get("/", (req,res)=>{
    res.send("Hello")
})


routes.get("/reports",getReports)

routes.post("/register", registerNewUser);

routes.post("/auth", userAuth);

routes.post("/new-report", validateCreate, addReport)

routes.get("/report", getOneReport)

module.exports = routes;