const reportsController = {};
const connection = require("../database/db");
const { arrToChart } = require("../helpers/arrToChart");
const { report } = require("../routes");

reportsController.getReports = (req, res) => {
  let sql = "SELECT * FROM factores";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
};

reportsController.getOneReport = (req,res)=>{
  const {year, municipio} =req.query
  let sql = `SELECT * FROM factores WHERE (year ="${year}" AND municipio = "${municipio}")`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    const dataToChart = arrToChart(results)
    res.json(dataToChart);
  });
}

reportsController.addReport = (req, res) => {
  const {
    factorClimatico,
    factorGeologico,
    nivelCauce,
    nivelAguaSubTerranea,
    volumen,
    coberturaForestal,
    demanda,
    municipio,
    mes,
    year,
    resultado,
    idUser
  } = req.body;
  const dataToDb = {
    factor_climatico:factorClimatico,
    factor_geologico:factorGeologico,
    nivel_cauce:nivelCauce,
    nivel_aguaSubterranea:nivelAguaSubTerranea,
    volumen,
    cobertura_forestal:coberturaForestal,
    demanda,
    municipio,
    mes,
    year,
    resultado,
    id_user:idUser
  }
  try {
    const sql = "INSERT INTO factores SET ?";
    connection.query(sql, dataToDb, (error, results)=>{
        if(error) throw error;
        res.send({ok:true, err:false, status:200, statusText: "Reporte agregado con exito"});

    })
  } catch (error) {
    console.log(error);
  }
};

reportsController.updateReport = (req, res)=>{
  const {id}=req.params;
  const {
    factorClimatico,
    factorGeologico,
    nivelCauce,
    nivelAguaSubTerranea,
    volumen,
    coberturaForestal,
    demanda,
    municipio,
    mes,
    year,
    resultado,
    idUser
  } = req.body;
  const dataToDb = {
    factor_climatico:factorClimatico,
    factor_geologico:factorGeologico,
    nivel_cauce:nivelCauce,
    nivel_aguaSubterranea:nivelAguaSubTerranea,
    volumen,
    cobertura_forestal:coberturaForestal,
    demanda,
    municipio,
    mes,
    year,
    resultado,
    id_user:idUser
  }

let sql = "UPDATE factores SET? WHERE id_factores=?"
connection.query(sql,[dataToDb,id], (error, result)=>{
  if(error) throw error;
  // console.log(result);
  res.send({ok:true, err:false, status:200, statusText: "Reporte actualizado con exito"});
} )
}

reportsController.deleteReport = (req,res)=>{
  const {id}=req.params;
  let sql = "DELETE FROM factores WHERE id_factores=?"
connection.query(sql,[id], (error, result)=>{
  if(error) throw error;
  // console.log(result);
  res.send({ok:true, err:false, status:200, statusText: "Reporte Eliminado con exito"});
} )

}

reportsController.findOneReport = (req,res)=>{
  const {id}= req.params;
  let sql = "SELECT * FROM factores WHERE id_factores= ?";
  connection.query(sql, [id], (error, result)=>{
    if (error) throw error;
    res.send({ok:true, err:false, status:200, data: result[0]});

  })
}
module.exports = reportsController;
