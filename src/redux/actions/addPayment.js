const type="ADD_PAYMENT"

const listaIngresos =(payment)=>{
    return {
        type,
        payload:payment
    }
}


export default listaIngresos