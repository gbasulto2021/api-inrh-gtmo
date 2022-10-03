const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const values = [
  "mes",
  "year",
  "municipio",
  "factorClimatico",
  "factorGeologico",
  "nivelCauce",
  "nivelAguaSubTerranea",
  "volumen",
  "coberturaForestal",
  "demanda",
];

const arrOfMethods = []

for (let i=0; i<values.length; i++){
    arrOfMethods.push(check(values[i]).exists().not().isEmpty())
  }

const validateCreate = [...arrOfMethods, (req,res,next)=>validateResult(req,res,next)];

module.exports = { validateCreate };
