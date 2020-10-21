const type="LISTA_INGRESOS"

const listaIngresos =(listaIngresos)=>{
    return {
        type,
        payload:listaIngresos
    }
}

export default listaIngresos