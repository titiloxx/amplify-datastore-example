const type="SET_RESERVA"

const listaIngresos =(reserva)=>{
    return {
        type,
        payload:reserva
    }
}

export default listaIngresos