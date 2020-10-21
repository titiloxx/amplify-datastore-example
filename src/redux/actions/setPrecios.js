const type="SET_PRECIOS"

const listaIngresos =(listaIngresos)=>{
    return {
        type,
        payload:listaIngresos
    }
}

export default listaIngresos