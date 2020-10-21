import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Col,Row} from 'reactstrap';
import TablaHabitaciones from './tablaHabitaciones'
import TablaTipoPrecios from './tablaTipoPrecios'
import TablaTipoHabitaciones from './tablaTipoHabitaciones'
import { Menu } from 'semantic-ui-react'
import StepWizard from 'react-step-wizard';
import LoadingOverlay from 'react-loading-overlay';

const Configuracion=({dispatch,informacionHotel,isMobile,listaDeptos})=>{
    const [mostrarTipoHabitaciones,setMostrarTipoHabitaciones]=useState()
    const [stepWizard,setStepWizard]=useState(null);
    const [loading,setLoading]=useState(false);

    return (
        <LoadingOverlay
    active={loading}
    spinner
    text='Actualizando'
    >
    <br></br>
    <Col xs={12} md={3} className={"textLeft"}> <h3>Lugares de acampe</h3></Col>
    {/*informacionHotel.roomTypes&&<Menu pointing={!isMobile} secondary={!isMobile} stackable>
        {informacionHotel.roomTypes.filter(x=>x.name).map((x,i)=>
            <React.Fragment key={i}>
                <Menu.Item 
                        name={x.name}
                        active={mostrarTipoHabitaciones === x.name}
                        onClick={()=>{setMostrarTipoHabitaciones(x.name);stepWizard.goToStep(i+1)}}
                    />        
            </React.Fragment>
            )}

        <Menu.Menu position='right'>
            <Menu.Item 
                    name={"Administrar Habitaciones"}
                    active={mostrarTipoHabitaciones === "Administrar Habitaciones"}
                    onClick={()=>{setMostrarTipoHabitaciones("Administrar Habitaciones");stepWizard.goToStep(informacionHotel.roomTypes.length)}}
                />      
             </Menu.Menu>
        </Menu>*/}
    <br></br>
    <TablaHabitaciones listaDeptos={listaDeptos} setLoading={setLoading}/>
    
</LoadingOverlay>

    )
}

export default connect(state=>({informacionHotel:state.dormis.informacionHotel,isMobile:state.dormis.isMobile,listaDeptos:state.dormis.listaDeptos}),null)(Configuracion)
