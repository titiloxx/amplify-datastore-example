import React from 'react';
import {connect} from 'react-redux'
import MaterialTable from 'material-table';
import {CrearRoomType,ModificarRoomType,EliminarRoomType} from '../../../Funciones/bookingEngine'

const CorroborarData=(data)=>{
    if (
    !data.name){
      alert("Faltan completar campos")
      
      return false;
    }
    else{
        return true;
    }
}

 const MaterialTableDemo= ({data,setData,listaTipoHabitaciones,dispatch,setLoading})=> {
   const columns= [
      { title: 'Nombre', field: 'name' },
      {title: 'Descripcion', field: 'description' }
     ]

  return (
    <MaterialTable
      title={`Tipo de Habitaciones`}
      columns={columns}
      data={listaTipoHabitaciones}
      style={{textAlign:"right !important",padding:'10px'}}
      localization={{
            body:{
            addTooltip:"Agregar tipo de habitacion",
            emptyDataSourceMessage:"No se cargaron tipo de habitaciones",
            deleteTooltip:"Eliminar",
            editTooltip:"Editar",
            editRow:{
            deleteText:"¿Seguro que quieres eliminar el tipo de habitacion?",
            cancelTooltip:"Cancelar",
            saveTooltip:"Guardar"}},
            header:{actions:"Acciones"}}}
      options={{
        search: false,
        sorting:false,
        draggable:false
      }}
      editable={{
        onRowAdd: newData =>{

            if (CorroborarData(newData))
            {
              const obj={
                "account_id": 5,
                "adults": 4,
                "price": 2400,
                "children": 2,
                "enabled": 1,
                "enabled_ota": 1,
                "accommodation_type": 1,
              }
              setLoading(true);
              CrearRoomType({...obj,...newData},setLoading,dispatch);
                
            }
           return( new Promise(resolve => {
                resolve();    
        }))},

        onRowUpdate: (newData, oldData) =>
        {
            if (oldData&&CorroborarData(newData)) {
              setLoading(true);
              const newAux=JSON.parse(JSON.stringify(newData))
              newAux.roomtype_id=newAux.id
              delete newAux.id
              delete newAux.priceList
              delete newAux.roomList
              ModificarRoomType(newAux,setLoading,dispatch);
              }
              return(new Promise(resolve => {
              resolve();
          }))},

        onRowDelete: oldData =>{
          setLoading(true);
          EliminarRoomType(oldData,setLoading,dispatch);
        
          return (new Promise(resolve => {
              resolve();

          }))},
      }}
    />
  );
}
export default connect(state=>({}),null)(MaterialTableDemo)

