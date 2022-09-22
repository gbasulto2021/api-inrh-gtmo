const usersController = {};
const connection = require("../database/db");
const bcryptjs = require("bcryptjs");

usersController.userAuth = async (req, res) => {
    try {
      const email = req.body.email;
      const pass = req.body.pass;
     
        
      if (email && pass) {
        let sql = "SELECT * FROM users WHERE email=?";
        connection.query(sql, [email], async (error, results) => {
          if (error) throw error;
                
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].pass))
          ) {
            res.json({ok:false, status:401, statusText:"email or password incorrect"})
          } else {
            req.session.loggedin = true;
            req.session.name = results[0].name;
            req.session.rol = results[0].rol;
            res.json({ok:true, status:200, statusText:"Login Successful"})
          }
        });
      } else {
        res.json({ok:false, status:400, statusText:"email and password are require"})
      }
    } catch (error) {
      console.log(error);
    }
  }

usersController.registerNewUser = async (req, res) => {

    try {
      
      const ci = req.body.ci;
      const name = req.body.name;
      const lastName = req.body.lastName;
      const pass = req.body.pass;
      const email = req.body.email;
      const rol = req.body.rol;
     
      let passHash = await bcryptjs.hash(pass, 8);
      
      let sql = "INSERT INTO users SET ?";
      
      connection.query(
        sql,
        { email: email, name: name, pass: passHash, rol: rol, ci: ci, last_name: lastName },
        (error, result) => {
          if (error) throw error;
           res.json({ok:true, err:false, status:200, statusText: "User registred"});
        }
      );
    } catch (error) {
      console.log(error);
    }
  }



module.exports = usersController;