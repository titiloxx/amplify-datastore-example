const type="INFORMACION_HOTEL"

const listaIngresos =(listaIngresos)=>{
    return {
        type,
        payload:listaIngresos
    }
}

export default listaIngresos