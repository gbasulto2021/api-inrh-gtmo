const usersController = {};
const connection = require("../database/db");
const bcryptjs = require("bcryptjs");

usersController.userAuth = async (req, res) => {
    try {
      const username = req.body.username;
      const pass = req.body.pass;
     
        
      if (username && pass) {
        let sql = "SELECT * FROM users WHERE username=?";
        connection.query(sql, [username], async (error, results) => {
          if (error) throw error;
                
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].pass))
          ) {
            res.json({ok:false, status:401, statusText:"El usuario o contraseña es incorrecto"})
          } else {
            req.session.loggedin = true;
            req.session.username = results[0].username;
            req.session.rol = results[0].rol;
            const {id_user,username,rol} = results[0];
            res.json({ok:true, status:200, statusText:"Login Exitoso", data:{id_user,username,rol}})
          }
        });
      } else {
        res.json({ok:false, status:400, statusText:"Usuario y contraseña son requeridos"})
      }
    } catch (error) {
      console.log(error);
    }
  }

usersController.registerNewUser = async (req, res) => {

    try {
      
      const username = req.body.username;
      const pass = req.body.pass;
      const rol = req.body.rol;
     
      let passHash = await bcryptjs.hash(pass, 8);
      
      let sql = "INSERT INTO users SET ?";
      
      connection.query(
        sql,
        { username,pass:passHash,rol},
        (error, result) => {
          if (error) throw error;
           res.json({ok:true, err:false, status:200, statusText: "Usuario registrado con exito"});
        }
      );
    } catch (error) {
      console.log(error);
    }
  }



module.exports = usersController;