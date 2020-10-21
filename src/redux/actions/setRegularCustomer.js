const type="SET_REGULAR_CUSTOMER"

const listaIngresos =(payment)=>{
    return {
        type,
        payload:payment
    }
}


export default listaIngresos