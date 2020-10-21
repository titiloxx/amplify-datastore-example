import { DataStore } from '@aws-amplify/datastore';
import { Reservations, Customers,Rooms} from '../models/index'
import store from '../redux/store.js'
import moment from 'moment'
import listaHabitaciones from '../Components/habitaciones.json'

export const CargarDeptosADynamo= ()=>{
  for (let element of listaHabitaciones) {
    delete element.room
    delete element.roomId
    delete element.state
    delete element.type
    DataStore.save(new Rooms(element))
  }
}

export const InformacionReservas=(listaReservas,fecha)=>{
    const fechaMoment=moment(fecha);
    var salen=[]
    var entran=[]
    var estancias=[]
    for (var item of listaReservas) {
      if (moment(item.checkoutEstimated).format("YYYY-MM-DD")==fechaMoment.format("YYYY-MM-DD")){
        salen=[...salen,item]
      }
      else if(moment(item.checkinEstimated).format("YYYY-MM-DD")==fechaMoment.format("YYYY-MM-DD")){
        entran=[...entran,item]
      }
      else if(fechaMoment.isBetween(item.checkinEstimated,item.checkoutEstimated)){
        estancias=[...estancias,item]
      }
    }
    return {salen,entran,estancias}
  
  }

export const InformacionReservasMapa=(listaReservas,fecha)=>{
    const fechaMoment=moment(fecha);
    var salen=[]
    var entran=[]
    var estancias=[]
    for (var item of listaReservas) {
      if (item.checkoutMade!=null||item.state=="cancelada") {
          continue;
      }
      if (moment(item.checkoutEstimated).format("YYYY-MM-DD")==fechaMoment.format("YYYY-MM-DD")){
        salen=[...salen,item]
      }
      else if(moment(item.checkinEstimated).format("YYYY-MM-DD")==fechaMoment.format("YYYY-MM-DD")){
        entran=[...entran,item]
      }
      else if(fechaMoment.isBetween(item.checkinEstimated,item.checkoutEstimated)){
        estancias=[...estancias,item]
      }
    }
    return {salen,entran,estancias}
  
  }

export const HabitacionesDisponibles=(fechaIngreso,fechaSalida,listaReservas=null)=>{
    fechaSalida=moment(fechaSalida)
    fechaIngreso=moment(fechaIngreso)
    if(listaReservas==null){
      listaReservas=store.getState().listaReservas.filter(x=>x.state!='cancelada'&&x.state!='checkout')
    }
    
    //Los departamentos que estan tomados para las fechas
    var listaDeptos=[]
    const cantidadDias=fechaSalida.diff(fechaIngreso,"days")
    
    for (var i = 0; i < cantidadDias; i++) {
      const infoFecha=InformacionReservas(listaReservas,fechaIngreso)
      listaDeptos=[...listaDeptos,...infoFecha.entran.map(x=>x.roomsList).reduce((a,b)=>[...a,...b],[]),...infoFecha.estancias.map(x=>x.roomsList).reduce((a,b)=>[...a,...b],[])]
      fechaIngreso.add(1,"days");
    }
    var listaReturn=[]
    const departamentos=store.getState().listaDeptos;
    for (var item of departamentos){
      
      if (!listaDeptos.find(x=>x==item)){
          listaReturn=[...listaReturn,item]
      }
  
    }
    return listaReturn
  }

export function ElegirColor(estado){
    switch (estado){
      case "confirmada":
        return "#2185d0"
      case "checkin":
        return "#21ba45"
      case "cancelada":
        return "black"
      case "checkout":
        return "#db2828"
  
    }
   
  }

export function CapitalFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

 export const CargarReserva=async(nuevaReserva,customerList)=>{
     const r= await DataStore.save(new Reservations(nuevaReserva));
     for (let customer of customerList) {
         const ReservationsId=r.id;
         await DataStore.save(new Customers({...customer,ReservationsId}));
     }
 }

 export function Normalizar(string){
  return string.trim().toLocaleLowerCase().split("'").join("").split("-").join(" ").split(" ").map(x=>CapitalFirst(x)).join(" ")
 }
 