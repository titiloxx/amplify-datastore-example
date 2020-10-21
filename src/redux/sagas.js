
import { takeLatest,put,call } from 'redux-saga/effects'
import { DataStore } from '@aws-amplify/datastore';
import { Customers, Reservations,Rooms } from '../models';
import moment from 'moment'

function* saveReservations({payload:nuevaReserva}){
    const r= yield DataStore.save(new Reservations(nuevaReserva));
    for (let customer of nuevaReserva.customersList) {
        const ReservationsId=r.id;
          yield DataStore.save(new Customers({...customer,ReservationsId}));
       
    }
    nuevaReserva.nuevaReserva=false;
    yield put({type:'SET_RESERVA',payload: nuevaReserva})
}

function* reloadRooms() {
  const rooms=yield call(DataStore.query,Rooms)
  yield put({type:'SET_LISTA_DEPTOS',payload: rooms})
}

function* reloadReservations() {
    const reservas= yield call(DataStore.query,Reservations);
    const customers=yield call(DataStore.query,Customers)
    const rooms=yield call(DataStore.query,Rooms)
   /* yield DataStore.delete(reservas);
    yield DataStore.delete(customers);
    yield DataStore.delete(rooms);*/

    let listaReservas=[]
    for (let reserva of reservas) {
     listaReservas=[...listaReservas,{...reserva,
      customersList:customers.filter(c => c.ReservationsId === reserva.id),
      roomsList:reserva.roomsList.map(x=>rooms.find(y=>y.id==x))}]
    }
    //const rAux=reservas.map(x=>( {id: x.id, text: x.description, start:moment.unix(x.checkinEstimated).format('YYYY-MM-DD'), end: moment.unix(x.checkoutEstimated).format(`YYYY-MM-DD`), resource: x.resource }));
    listaReservas.forEach(x=>{
      x.servicesList=[]
      x.percentPayed=50
      x.vehiclesList=[]
    })

    console.log(listaReservas)
    yield put({type:'LISTA_RESERVAS',payload: listaReservas})
    yield put({type:'SET_LISTA_DEPTOS',payload: rooms})
  }


// use them in parallel
export default function* rootSaga() {
    yield takeLatest('RELOAD_RESERVATIONS', reloadReservations)
    yield takeLatest('RELOAD_ROOMS', reloadRooms)
    yield takeLatest('SAVE_RESERVATION', saveReservations)
  }
