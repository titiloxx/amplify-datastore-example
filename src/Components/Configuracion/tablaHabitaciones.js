import React from 'react';
import {connect} from 'react-redux'
import MaterialTable from 'material-table';
import {AgregarHabitacion,ModificarHabitacion} from '../../../Funciones/utils'
import {addRoom,modifyRoom} from '../../../graphql/mutations'

const CorroborarData=(data)=>{
    if (
    !data.number||
    !data.sector||
    !data.state){
      alert("Faltan completar campos")
      
      return false;
    }
    else{
        return true;
    }
}

 const MaterialTableDemo= ({data,setData,listaDeptos,dispatch,type,setLoading})=> {
   const lookup={ 1: 'ok',2: 'reparacion'}
   const columns= [
      { title: 'Nombre', field: 'number' },
      { title: 'Sector', field: 'sector' },
      { title: 'Estado', field: 'state',lookup} ]
  const dictEstados={ 'ok': 1,'reparacion':2};
  return (
    <MaterialTable
      title={`Lugares (${listaDeptos.length})`}
      columns={columns}
      data={listaDeptos.map(x=>({...x,state:dictEstados[x.state]}))}
      style={{textAlign:"right !important",padding:'10px'}}
      localization={{
            body:{
            addTooltip:"Agregar lugar",
            emptyDataSourceMessage:"No se cargaron lugares",
            deleteTooltip:"Eliminar",
            editTooltip:"Editar",
            editRow:{
            deleteText:"¿Seguro que quieres eliminar el lugar?",
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
            const room={...newData,state:lookup[newData.state],type:'camping'}
            if (CorroborarData(room))
            {
              AgregarHabitacion(room,setLoading,dispatch)
                
            }
           return( new Promise(resolve => {
                resolve();    
        }))},

        onRowUpdate: (newData, oldData) =>
        {
            const room={...newData,state:lookup[newData.state],type:'camping'}
            delete room.room
            console.log(room)
            if (oldData&&CorroborarData(room)) 
            {
              room.roomId=listaDeptos.find(x=>x.room==oldData.room).roomId
              ModificarHabitacion(room,setLoading,dispatch)
              }
              return(new Promise(resolve => {
              resolve();
          }))},

        onRowDelete: oldData =>
          new Promise(resolve => {
              alert("No se pueden eliminar habitaciones debido a que pueden tener reservas y estas se perderian")
              resolve();
              setData(data.filter(x=>x!=oldData));

          }),
      }}
    />
  );
}

export default connect(state=>({}),null)(MaterialTableDemo)

