import React,{useState,useEffect} from "react"
import LoadingOverlay from 'react-loading-overlay';
import {Modal, ModalHeader, ModalBody, Container,Col,Row} from 'reactstrap';
import {connect} from 'react-redux'
import moment from 'moment'
import StepWizard from 'react-step-wizard';
import Caja from './caja'
import Reserva from './reserva'
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Icon,Form, TextArea } from 'semantic-ui-react'
import {HabitacionesDisponibles} from '../../Functions/utils'
import { Button} from 'semantic-ui-react'
import Firma from './firma'
import printJS from 'print-js'
//Actions
import setModal from '../../redux/actions/setModalReserva'
import setReserva from '../../redux/actions/setReserva'

const ReiniciarModal=(dispatch,setActiveItem,stepWizard)=>{
  setActiveItem("pagos")
  stepWizard.goToStep(1)
  dispatch(setModal(false))
}
export const ModalAux = ({checkoutTime,openModal,dispatch,reserva,isMobile}) => {
  const [nuevaReserva,setNuevaReserva]=useState(true);
  const [stepWizard,setStepWizard]=useState({});
  const [notas,setNotas]=useState("");
  const [loading,setLoading]=useState(false);
  const [activeItem,setActiveItem]=useState("reserva");
  useEffect(()=>{

    if (reserva.nuevaReserva){
      setNuevaReserva(true)
      delete reserva.nuevaReserva
    }
    else{
      setNuevaReserva(reserva.customersList==undefined)
      setNotas(reserva.description)
      setActiveItem(reserva.customersList==undefined?"reserva":"pagos")
    }
  },[reserva])
  const goToPayment=()=>{setActiveItem("pagos");stepWizard.goToStep(1)}
  return (
    <Modal style={{maxWidth:"1000px"}} size={"lg"} isOpen={openModal} toggle={()=>{ReiniciarModal(dispatch,setActiveItem,stepWizard);}} >
    <LoadingOverlay
    active={loading}
    spinner
    text='Agregando'
    >
    <ModalHeader style={{borderBottom:"none"}} toggle={()=>{ReiniciarModal(dispatch,setActiveItem,stepWizard);}}
    >{reserva.customersList!=undefined?`Cuenta de ${reserva.customersList[0].fullName}`:`Nuevo Registro`}
    </ModalHeader>
    {!nuevaReserva&&<Firma ingreso={reserva}/>}
    <ModalBody>
    <Menu tabular={!isMobile} stackable>
    {!nuevaReserva&&<Menu.Item
          active={activeItem === 'pagos'}
          onClick={()=>{setActiveItem("pagos");stepWizard.goToStep(1)}}
        >Pagos<Icon size='large' style={{marginLeft:"5px"}} name='money bill alternate'/></Menu.Item>}
    <Menu.Item
          active={activeItem === 'reserva'}
          onClick={()=>{setActiveItem("reserva");stepWizard.goToStep(2)}}
        >Datos<Icon size='large' style={{marginLeft:"5px"}} name='address book'/></Menu.Item>
      {!nuevaReserva&&<Menu.Item
          active={activeItem === 'notas'}
          onClick={()=>{setActiveItem("notas");stepWizard.goToStep(3)}}
        >Notas<Icon size='large' style={{marginLeft:"5px"}} name='edit'/></Menu.Item>}
      {!nuevaReserva&&<Menu.Item
          position='right'
          active={activeItem === 'firmar'}
          onClick={()=>{printJS('printFirma', 'html')}}
        >Firmar<Icon size='large' style={{marginLeft:"5px"}} name='pencil alternate'/></Menu.Item>}
      {!nuevaReserva&&<Menu.Item
          active={activeItem === 'duplicar'}
          onClick={()=>{if (window.confirm(`¿Seguro que quieres empezar un nuevo registro a partir de los datos de ${reserva.customersList[0].fullName}?`)) {

            const checkoutEstimated=moment().add(1,'days').set({hour:checkoutTime-3,minute:0,second:0,millisecond:0}).format();
            const checkinEstimated=moment().set({hour:checkoutTime-3,minute:0,second:0,millisecond:0}).format();
            const habitacionesDisponibles=HabitacionesDisponibles(checkinEstimated,checkoutEstimated)
            setActiveItem("reserva");
            stepWizard.goToStep(2)
            const vehiclesList=JSON.parse(JSON.stringify(reserva.vehiclesList))
            vehiclesList.forEach(element => {
              delete element.tableData;
            });
            const customersList=reserva.customersList.map(x=>{const {age,customerId,...aux}=x;return(aux)})
            const nuevaReserva= {
                        "guests": 2,
                        "children": 0,
                        checkoutEstimated,
                        checkinEstimated,
                        vehiclesList,
                        customersList,
                        servicesList:[],
                        nuevaReserva:true,
                        "state": "confirmada",
                        "way": "Presencial",
                        "roomsList":habitacionesDisponibles.length!=0?[habitacionesDisponibles[0]]:[],
              }
              dispatch(setReserva(nuevaReserva))
          }}}
        >Duplicar<Icon size='large' style={{marginLeft:"5px"}} name='copy outline icon'/></Menu.Item>}
    </Menu>

      <StepWizard instance={(e)=>setStepWizard(e)}>
      {reserva.customersList&&<Caja reserva={reserva} ReiniciarModal={()=>{ReiniciarModal(dispatch,setActiveItem,stepWizard)}}/>}
          <Reserva reserva={reserva} nuevaReserva={nuevaReserva} goToPayment={goToPayment}/> 
          {reserva.customersList&& 
          <Form>
            <TextArea value={notas} onChange={(e)=>{setNotas(e.target.value)}} placeholder='Escribir notas..'/>
           
            <Container>
            <br></br>
            <Row>
              <Col style={{display: "contents"}}>
                <Button size='big' color='teal' fluid onClick={()=>{/*
                  setLoading(true);reserva.description=notas;CambiarEstadoReserva(reserva,setLoading,()=>{ReiniciarModal(dispatch,setActiveItem,stepWizard);dispatch(setModal(false));},dispatch)
                */}}>Guardar</Button></Col>
         </Row>
         </Container>
         </Form>}
      </StepWizard>
    </ModalBody>
    </LoadingOverlay>
  </Modal>
   
    )
}



export default connect(state=>({checkoutTime:state.checkoutTime,preReserva:state.preReserva,openModal:state.modal,reserva:state.reserva,isMobile:state.isMobile}),null)(ModalAux)

