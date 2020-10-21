import React from 'react';
import {connect} from 'react-redux'
import MaterialTable from 'material-table';
import {CrearRoomType,ModificarRoomType,EliminarRoomType} from '../../../Funciones/bookingEngine'

const CorroborarData=(data)=>{
    if (
    !data.name||
    !data.currency){
      alert("Faltan completar campos")
      
      return false;
    }
    else{
        return true;
    }
}

 const MaterialTableDemo= ({data,setData,listaPrecios,dispatch,setLoading,parentId})=> {
   const columns= [
      { title: 'Nombre', field: 'name' },
      { title: 'Cantidad personas', type:'numeric',field: 'adults' },
      { title: 'Moneda', field: 'currency',lookup: { 1: 'USD'} },
    ]

  return (
    <MaterialTable
      title={`Precios para la habitacion`}
      columns={columns}
      data={listaPrecios.map(x=>({...x,currency:1}))}
      style={{textAlign:"right !important",padding:'10px'}}
      localization={{
            body:{
            addTooltip:"Agregar habitacion",
            emptyDataSourceMessage:"No se cargaron habitaciones",
            deleteTooltip:"Eliminar",
            editTooltip:"Editar",
            editRow:{
            deleteText:"¿Seguro que quieres eliminar la habitacion?",
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
              delete newData.price;
              const obj={
                "adults": newData.adults,
                "price": 2400,
                "children": 2,
                "parent_id":parentId,
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
              newAux.adults=newAux.adults
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


