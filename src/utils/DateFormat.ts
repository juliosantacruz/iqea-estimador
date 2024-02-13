
export const setDateFormat=(date:string)=>{
  const leDate = new Date(date)

  const year = leDate.getFullYear()
  const month = leDate.getMonth()
  const day = leDate.getDay()

  const monthsYear = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

  const leFecha = `${year}-${monthsYear[month]}-${day}`

  return leFecha
}
