const type="LISTA_RESERVAS"

const listaIngresos =(reserva)=>{
    return {
        type,
        payload:reserva
    }
}

export default listaIngresos