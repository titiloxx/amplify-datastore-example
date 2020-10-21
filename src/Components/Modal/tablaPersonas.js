import React from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux'
import {ActualizarVehiculos} from '../../Functions/utils'
import moment from 'moment';

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
    {/*
 */}
 const MaterialTableDemo= ({recargar,data,setNombre,setEmail,setEdad,setTelefono,listaPersonas,setDni,setListaPersonas,setCustomerId,setArgolia,setListIndex})=> {
   const columns= [
      { title: 'Nombre y apellido', field: 'fullName' },
      { title: 'Documento de identidad', field: 'dni' },
    /*  { title: 'Email', field: 'email' },
   { title: 'Telefono', field: 'phone' }*/]

  return (
    <MaterialTable
      title="Personas"
      columns={columns}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Editar',
          onClick: (event, rowData) => {
            for (let index = 0; index < listaPersonas.length; index++) {
              const element = listaPersonas[index];
              if (rowData.fullName==element.fullName&&
                  rowData.dni==element.dni){
                    setListIndex(index)
            }
          }
            const phoneAux=rowData.phone?rowData.phone.split(' ').join(''):'';
            const edad=rowData.birthdate?moment(moment()).diff(rowData.birthdate,'years'):"";
            setNombre(rowData.fullName)
            setEmail(rowData.email)
            setEdad(edad>0?edad:"")
            setTelefono(phoneAux)
            setDni(rowData.dni)
            setCustomerId(rowData.customerId)
            setArgolia((rowData.geo)?JSON.parse(rowData.geo).value:'')
            
          }
        },
        {
          icon: 'delete',
          tooltip: 'Eliminar',
          onClick: (event, rowData) => {
            console.log(listaPersonas)
            setListaPersonas([...listaPersonas.filter(x=>x.fullName!=rowData.fullName||x.dni!=rowData.dni)])
          }
        },
      ]}
      data={data}
      style={{textAlign:"right !important",padding:'10px'}}
      localization={{
        body:{
        emptyDataSourceMessage:"No se cargaron personas"},
        header:{actions:"Acciones"}}}
      options={{
        showTitle:false,
        paging:false,
        search: false,
        sorting:false,
        draggable:false
      }}
    />
  );
}

export default connect(state=>({listaReservas:state.listaReservas}),null)(MaterialTableDemo)

