const type="ADD_SERVICE"

const listaIngresos =(payment)=>{
    return {
        type,
        payload:payment
    }
}


export default listaIngresos