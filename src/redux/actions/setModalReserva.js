const type="SET_MODAL_RESERVA"

const listaIngresos =(reserva)=>{
    return {
        type,
        payload:reserva
    }
}

export default listaIngresos