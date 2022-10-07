const connection = require("../database/db");

const validateDuplicate = (req,res,next)=>{
    const {year, municipio, mes} =req.body
    let sql = `SELECT * FROM factores WHERE (year ="${year}" AND municipio = "${municipio}" AND mes = "${mes}")`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if(results.length > 0){
        res.send({ok: false, err:true, status:403, statusText:"El reporte ya existe"})
      }else{
        next()
      }
   });
}


module.exports = {validateDuplicate};