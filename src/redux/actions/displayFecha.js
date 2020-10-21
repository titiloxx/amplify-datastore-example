const type="SET_FECHA"

const listaIngresos =(reserva)=>{
    return {
        type,
        payload:reserva
    }
}

export default listaIngresos