import { DataStore } from '@aws-amplify/datastore';
import { Reservations, Customers} from '../models/index'
import moment from 'moment'

export const ActualizarDatastore=async (state,setState)=>{
    const reservas= await DataStore.query(Reservations);
    console.log(reservas)
    const customers=await DataStore.query(Customers);
    let listaReservas=[]
    for (let reserva of reservas) {
     listaReservas=[...listaReservas,{...reserva,customerList:customers.filter(c => c.ReservationsId === reserva.id)}]
    }
    const rAux=reservas.map(x=>( {id: x.id, text: x.description, start:moment.unix(x.checkinEstimated).format('YYYY-MM-DD'), end: moment.unix(x.checkoutEstimated).format(`YYYY-MM-DD`), resource: x.resource }));
    
    setState({...state,events:rAux})
 }

 export const CargarReserva=async(nuevaReserva,customerList)=>{
     const r= await DataStore.save(new Reservations(nuevaReserva));
     for (let customer of customerList) {
         const ReservationsId=r.id;
         await DataStore.save(new Customers({...customer,ReservationsId}));
     }
 }
