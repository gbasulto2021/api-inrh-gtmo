const reportsController = {};
const connection = require("../database/db");

reportsController.getReports = (req, res) => {
  let sql = "SELECT * FROM factores";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
};

reportsController.addReport = (req, res) => {
  const {
    factorClimatico,
    factorGeologico,
    nivelCauce,
    nivelAguaSubTerranea,
    volumen,
    coberturaForestal,
    demanda,
    fecha,
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
    fecha,
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
        res.json({ok:true, err:false, status:200, statusText: "Reporte agregado con exito"});

    })
  } catch (error) {
    console.log(error);
  }
};

module.exports = reportsController;
