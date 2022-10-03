const arrToChart = (report)=>{
    const arr =[]
      for (let i = 0; i < report.length; i++) {
        const obj = {}
        obj.mes= report[i].mes
        obj.resultado = report[i].resultado
         arr.push(obj)
       }
   return arr;
}

module.exports = {arrToChart};
