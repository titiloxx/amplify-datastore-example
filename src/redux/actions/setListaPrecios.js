const type="SET_LISTA_PRECIOS"

const listaIngresos =(listaIngresos)=>{
    return {
        type,
        payload:listaIngresos
    }
}

export default listaIngresos