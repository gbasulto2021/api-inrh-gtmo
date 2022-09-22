const express = require("express");
const routes = express.Router();

const { registerNewUser, userAuth} = require("../controllers/usersController");
const {getReports, addReport } = require("../controllers/reportsController");

routes.get("/", (req,res)=>{
    res.send("Hello")
})


routes.get("/reports",getReports)

routes.post("/register", registerNewUser);

routes.post("/auth", userAuth);

routes.post("/new-report", addReport)



module.exports = routes;