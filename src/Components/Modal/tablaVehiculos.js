import React from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux'
//import {ActualizarVehiculos} from '../../Functions/utils'

const CorroborarData=(data)=>{
    if (
    !data.brand||
    !data.plate||
    data.brand.trim()==""||
    data.plate.trim()==""){
      alert("Faltan completar campos")
      
      return false;
    }
    else{
        return true;
    }
}

 const MaterialTableDemo= ({data,setData,reservationId,dispatch})=> {
   const columns= [
      { title: 'Patente', field: 'plate' },
      { title: 'Marca', field: 'brand' } ]

  return (
    <MaterialTable
      title="Vehiculos"
      columns={columns}
      data={data}
      style={{textAlign:"right !important",padding:'10px'}}
      localization={{
            body:{
            addTooltip:"Agregar Vehiculo",
            emptyDataSourceMessage:"No se cargaron vehiculos",
            deleteTooltip:"Eliminar",
            editTooltip:"Editar",
            editRow:{
            deleteText:"Seguro que quieres eliminar el vehiculo?",
            cancelTooltip:"Cancelar",
            saveTooltip:"Guardar"}},
            header:{actions:"Acciones"}}}
      options={{
        showTitle:false,
        paging:false,
        search: false,
        sorting:false,
        draggable:false
      }}
      editable={{
        onRowAdd: newData =>{

            if (CorroborarData(newData))
            {
                const nuevaLista=[...data,{brand:newData.brand.trim(),plate:newData.plate.trim().split(' ').join("").split("-").join("").split("'").join("").toUpperCase(),type:"auto"}];
                //ActualizarVehiculos(reservationId,nuevaLista,dispatch)
                setData(nuevaLista);
                
            }
           return( new Promise(resolve => {
                resolve();    
        }))},

        onRowUpdate: (newData, oldData) =>
        {

            if (oldData&&CorroborarData(newData)) {
                const nuevaLista=data.map(x=>x==oldData?{brand:newData.brand.trim(),plate:newData.plate.trim().split(' ').join("").split("-").join("").split("'").join("").toUpperCase(),type:"auto"}:x);
                //ActualizarVehiculos(reservationId,nuevaLista,dispatch)
                setData(nuevaLista)}
                return(new Promise(resolve => {
              resolve();
          }))},

        onRowDelete: oldData =>
          new Promise(resolve => {

              resolve();
              setData(data.filter(x=>x!=oldData));

          }),
      }}
    />
  );
}

export default connect(state=>({listaReservas:state.listaReservas}),null)(MaterialTableDemo)

