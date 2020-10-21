const defaultState={
    listaReservas:[],
    reserva:{},
    fecha:null,
    listaDeptos:[],
    listaPrecios:[],
    mapInfo:"",
    mapLink:"",
    checkoutTime:0,
    regularCustomer:"",
    precios:{
        menor:0,
        mayor:0,
        auto:0,
        carpa:0,
        mchico:0,
        mgrande:0,
        camper:0,
        remolque:0
    },
    divisa:0,
    informacionHotel:{},
    refrescarDispoYPrecios:0,
    isMobile:false};

export const ArreglarServicesList=(servicesList)=>{
servicesList=servicesList.map(y=>({...y,paymentsList:y.paymentsList?y.paymentsList:[]}));

servicesList=servicesList.map(x=>{
    return ({...x,
    perNight:Math.round(x.cost/x.quantity),
    paid:x.paymentsList.filter(x=>!x.isRefund).reduce((a,b,i)=>a+b.amount,0),
    due:x.cost-x.paymentsList.filter(x=>!x.isRefund).reduce((a,b,i)=>a+b.amount,0)+x.paymentsList.filter(x=>x.isRefund).reduce((a,b,i)=>a+b.amount,0)})})
    return servicesList
}

export const GetPercentPayed=(servicesList)=>{
            //Calcular porcentaje pagado
            let percentPayed=0
            let costoTotal=servicesList.length!=0?servicesList.map(x=>x.cost).reduce((a,b)=>a+b):0;
            let pagado=servicesList.length!=0?servicesList.map(x=>x.paymentsList.map(y=>y.amount).reduce((a,b)=>a+b,0)).reduce((a,b)=>a+b):0;
            percentPayed=pagado/costoTotal;
            percentPayed=Math.round(percentPayed*100);
            if (costoTotal==0) {
                percentPayed=100;
            }
            //Si no hay nada pagado que diga que no pago nada
            if (servicesList.length==0){
                percentPayed=0;
            }
            if (percentPayed>100) {
                percentPayed=100;
            }
            return percentPayed;
}

export default function reducer(state=defaultState,{type,payload}){
    switch (type){
        case "LISTA_RESERVAS":
            return {...state,listaReservas:payload};
        case "INFORMACION_HOTEL":
            return {...state,informacionHotel:payload};
        case "SET_RESERVA":
            return {...state,reserva:payload};
        case "SET_MODAL_RESERVA":
            return {...state,modal:payload};
        case "SET_FECHA":
            return {...state,fecha:payload};
        case "SET_CHECKOUT_TIME":
            return {...state,checkoutTime:payload};
        case "SET_REGULAR_CUSTOMER":
            localStorage.setItem('regularCustomer', payload);
            return {...state,regularCustomer:payload};
        case "ROOM_TYPE":
            return {...state,roomType:payload};
        case "SET_PRECIOS":
            return {...state,precios:payload};
        case "SET_LISTA_DEPTOS":
            return {...state,listaDeptos:payload};
        case "SET_IS_MOBILE":
            return {...state,isMobile:payload};
        case "SET_DIVISA":
            return {...state,divisa:payload};
        case "SET_REFRESCAR":
            return {...state,refrescarDispoYPrecios:Math.random()*100000};
        case "SET_SESSION":
            return {...state,sesion:payload};
        case "SET_LISTA_PRECIOS":
            return {...state,listaPrecios:payload};
        case "SET_MAP_INFO":
            return {...state,mapInfo:payload};
        case "ADD_SERVICE":
            const {reservationId,service}=payload;
            for(var reserva of state.listaReservas){
               
                if (reserva.id==reservationId){
                    reserva.servicesList=[...reserva.servicesList,service]
                }
            }
            return {...state,refrescarDispoYPrecios:Math.random()*100000};
        case "ADD_PAYMENT":
            const {serviceId,payment}=payload;
            for(var reserva of state.listaReservas){
                const service=reserva.servicesList.find(x=>x.serviceId==serviceId);
                if (service){
                    service.paymentsList=[...service.paymentsList,payment]
                    reserva.servicesList=ArreglarServicesList(reserva.servicesList);
                    reserva.percentPayed=GetPercentPayed(reserva.servicesList);
                }
            }
         
            return {...state,refrescarDispoYPrecios:Math.random()*100000};
        default:
            return {...state};
    }
}