const type="SET_INGRESO"

const listaIngresos =(listaIngresos)=>{
    return {
        type,
        payload:listaIngresos
    }
}

export default listaIngresos