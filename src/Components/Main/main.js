import React, {useState,useRef, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {Col,Row,Modal} from 'reactstrap'
import moment from 'moment'
import { Menu,Label,Button } from 'semantic-ui-react'
import Scheduler from "./scheduler"
import DisplayFechaModal from './displayFecha'
import {Collapse} from 'react-collapse';
import DateRangePicker from '../Extras/dateRangePicker';
import {CargarDeptosADynamo} from '../../Functions/utils'
//ACTIONS
import { DataStore } from 'aws-amplify';

const Calendar=({checkoutTime,dispatch,fecha,setLoading})=>{
    const [fechaInicio,setFechaInicio]=useState(null)
    const [cantidadDias,setCantidadDias]=useState(90)
    const [mostrarReservas,setMostrarReservas]=useState("confirmadas")
    const [rangoFechasOpened,setRangoFechasOpened]=useState(false)
    const startRef=useRef();
    const endRef=useRef();

    useEffect(()=>{
      setFechaInicio(moment().add(-2,'days').format('YYYY-MM-DD'))

      //CargarDeptosADynamo();
    },[])
  
    const listaReservas=useSelector(state => state.listaReservas)
    
    return(
    <React.Fragment>
    <Button onClick={()=>{setRangoFechasOpened(!rangoFechasOpened)}}>Rango de fechas</Button>
      <br></br>
      {rangoFechasOpened&&<Collapse isOpened={rangoFechasOpened}>
          <Col xs={12}>
            <DateRangePicker startRef={startRef} endRef={endRef}/>
            <Button basic color='blue' size={"big"} onClick={()=>{
              const inicioFixed=startRef.current.value.split("/").reverse().join("-")
              const salidaFixed=endRef.current.value.split("/").reverse().join("-")
              setFechaInicio(inicioFixed);
              setCantidadDias(moment(salidaFixed).diff(moment(inicioFixed),"days"))}}>
              Buscar
            </Button>
          </Col>
      </Collapse>}
     {/* <Col xs={12} md={2} lg={1} style={{marginTop:'7px'}}>
          <Button size='big' color='teal' style={{fontSize:'24px',paddingTop:'5px',paddingBottom:'5px',paddingLeft:'15px',paddingRight:'15px'}} fluid onClick={()=>{       
            const checkoutEstimated=moment().add(1,'days').set({hour:checkoutTime-3,minute:0,second:0,millisecond:0}).format();
            const checkinEstimated=moment().set({hour:checkoutTime-3,minute:0,second:0,millisecond:0}).format();
            const habitacionesDisponibles=HabitacionesDisponibles(checkinEstimated,checkoutEstimated)
            const nuevaReserva= {
                        "guests": 2,
                        "children": 0,
                        checkoutEstimated,
                        checkinEstimated,
                        "state": "confirmada",
                        "way": "Presencial",
                        "roomsList":habitacionesDisponibles.length!=0?[habitacionesDisponibles[0]]:[],
              }
              dispatch(setReserva(nuevaReserva))
              dispatch(setModal(true));}}>+</Button>
      </Col>*/}
      <Menu pointing secondary >
        <Menu.Item
          name='Alojados'
          active={mostrarReservas === 'confirmadas'}
          onClick={()=>{setMostrarReservas("confirmadas")}}
        />
        <Menu.Item
          name='Egresados'
          active={mostrarReservas === 'canceladas'}
          onClick={()=>{setMostrarReservas("canceladas")}}
        />
      </Menu>
      <Row>
        <Col xs={12}>
        {mostrarReservas !== 'canceladas'&&
          <Label  color='blue' horizontal>
            Confirmada
          </Label>}
          {mostrarReservas !== 'canceladas'&&
          <Label  color='green' horizontal>
            Checkin
          </Label>}
          {mostrarReservas !== 'confirmadas'&&
          <Label  color='red' horizontal>
            Checkout
          </Label>}
          {mostrarReservas !== 'confirmadas'&&
           <Label  color='black' horizontal>
            Cancelada
          </Label>}
        </Col>
      </Row>
        {listaReservas&&<Scheduler  disable={mostrarReservas!="confirmadas"} listaReservas={mostrarReservas=="confirmadas"?listaReservas.filter(x=>x.state!='cancelada'&&x.checkoutMade==null):mostrarReservas=='canceladas'?listaReservas.filter(x=>x.state=='cancelada'||x.checkoutMade!=null):listaReservas} setLoading={setLoading} fechaInicio={fechaInicio} cantidadDias={cantidadDias}/>}
        <Modal/>
        <DisplayFechaModal fecha={fecha} mostrarFull={true}/>
    </React.Fragment>
    )}

export default Calendar

