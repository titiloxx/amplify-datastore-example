import React,{useState,useEffect,useRef} from 'react'
import ReactTable from 'react-table-6'
import moment from 'moment'
import {ElegirLabel} from '../../../Funciones/utils'
import {connect} from 'react-redux'
import { Checkbox } from 'semantic-ui-react'
import Imprimir from './imprimir'
import DateRangePicker from '../extras/dateRangePicker';
import { Button } from 'semantic-ui-react'
import {Col} from 'reactstrap'
import {Collapse} from 'react-collapse';
//ACTIONS
import setReserva from '../../../redux/actions/setReserva'
import setModal from '../../../redux/actions/setModalReserva'
import { Menu} from 'semantic-ui-react'


const withCaja=(componente,dispatch,props)=><div className="test-WithCaja" style={{cursor:"pointer"}} onClick={()=>{dispatch(setModal(true));dispatch(setReserva(props.original))}}>{componente}</div>

const TablaRegistro=({listaReservas,dispatch,isMobile})=>{
  const [mostrarReservas,setMostrarReservas]=useState("adeudados")
  const [tamanoPantalla,setTamanoPantalla]=useState(1000)
  const [todasLasPersonas,setTodasLasPersonas]=useState(false)
  const [rangoFechasOpened,setRangoFechasOpened]=useState(false)
  const [fechaInicio,setFechaInicio]=useState(null)
  const [cantidadDias,setCantidadDias]=useState(null)
  const startRef=useRef();
  const endRef=useRef();
  useEffect(()=>{
    setTamanoPantalla(window.innerWidth-100)
  },[])
  const timeFormat=isMobile?'DD/MM':'DD/MM/YYYY';
    var columns = [
        {
        Header: isMobile?'Creada':'Fecha Creada',
        accessor: 'created',
        
        sortMethod:(a, b, desc) => {
            if (moment(a).diff(moment(b),"minutes") > 0) {
              return 1
            }
            else{
                return -1
            }
          
          },
        Cell: props => withCaja(isMobile?moment(props.value).format(timeFormat).split('.').join(""):moment(props.value).format("DD MMM YYYY hh:mm").split('.').join(""),dispatch,props),
        filterable: false
          },
        /*{
        Header: isMobile?'Ingreso':'Fecha Ingreso',
        accessor: 'checkinEstimated',
        
        sortMethod:(a, b, desc) => {
            if (moment(a).diff(moment(b),"minutes") > 0) {
              return 1
            }
            else{
                return -1
            }
          
          },
        Cell: props => withCaja(isMobile?moment(props.value).format(timeFormat).split('.').join(""):moment(props.value).format(timeFormat).split('.').join(""),dispatch,props),
        filterable: false
          },*/{
        Header: isMobile?'Apellido':'Nombre y Apellido',
        id: 'fullName', 
        accessor: d => d.customersList[0].fullName, 
      
        Cell: props => withCaja(isMobile?props.value.split(" ")[0]:props.value,dispatch,props),
        filterMethod: (filter, rows) =>
                      rows.filter(x=>x.fullName.toLowerCase().includes(filter.value.toLowerCase())),
        filterAll: true// String-based value accessors!
        }, 
        {
            Header: 'Noches',
            accessor: 'nights',
          
            Cell: props => withCaja(props.value,dispatch,props),
            filterMethod: (filter, rows) =>
                          rows.filter(x=>x.nights==filter.value),
            filterAll: true// String-based value accessors!
            }, 
        {
            Header: 'Estado',
            accessor: 'state',
          
            Cell: props => withCaja(ElegirLabel(props.value),dispatch,props),
            filterMethod: (filter, rows) =>
                          rows.filter(x=>x.state.toLowerCase().includes(filter.value.toLowerCase())),
            filterAll: true// String-based value accessors!
            }, 
        {
            Header: 'Pagado',
            accessor: 'percentPayed',
          
            Cell: props => withCaja(props.value+"%",dispatch,props),
            filterMethod: (filter, rows) =>
                          rows.filter(x=>x.percentPayed==filter.value),
            filterAll: true// String-based value accessors!
            }, 
        {
          Header: 'DNI/PAS',
        
          id: 'dni', 
          accessor: d => d.customersList[0].dni, 
          Cell: props => withCaja(props.value!="null"?props.value:"-",dispatch,props),
          filterMethod: (filter, rows) =>
          rows.filter(x=>x.dni&&x.dni.toLowerCase().includes(filter.value.toLowerCase())),
          filterAll: true// String-based value accessors!
        },
        {
        Header: 'Vehiculos',
      
        Cell: props => withCaja(`${props.value.length>0?props.value.map(x=>(x.plate)).toString().replace(/,/g,' | '):"-"}`,dispatch,props),
        accessor: 'vehiclesList',
        filterMethod: (filter, rows) =>
        rows.filter(x=>x.vehiclesList.map(y=>(y.plate)).toString().toLowerCase().includes(filter.value.toLowerCase())),
        filterAll: true,
          },
        {
        Header: 'Lugar',
        accessor: 'roomsList',
        Cell: props => withCaja(props.value.map(x=>x.room).join(' '),dispatch,props),
        filterMethod: (filter, rows) =>
        rows.filter(x=>x.roomsList.map(x=>x.room).join(' ').toLowerCase().includes(filter.value.toLowerCase())),
        filterAll: true,
          },
        {
        Header: 'Salida',
        accessor: 'checkoutEstimated',
        Cell: props => withCaja(isMobile?moment(props.value).format(timeFormat).split('.').join(""):moment(props.value).add(3,"hours").format('dddd DD MMM YYYY hh:mm'),dispatch,props),
        filterable: false
        }]

    let lista=todasLasPersonas?listaReservas.map(x=>x.customersList.map(y=>({...x,customersList:[y,...x.customersList.filter(x=>x!=y)]}))).flat():listaReservas

    lista=lista.sort((a, b) => moment(a.checkinEstimated).diff(moment(b.checkinEstimated)))
    lista=mostrarReservas=="alojados"?lista.filter(x=>x.checkinMade&&!x.checkoutMade&&x.state!="cancelada"):lista;
    lista=mostrarReservas=="adeudados"?lista.filter(x=>(x.percentPayed!=100||moment(x.checkoutEstimated).add(3,"hours").diff(moment(),'minutes')<0)&&x.state=="checkin"):lista;
    lista=mostrarReservas=="fllegar"?lista.filter(x=>x.checkinMade==null&&x.state!="cancelada"):lista;
    lista=mostrarReservas=="imprimir"?lista.filter(x=>x.checkoutMade!=null):lista;
  
    if (mostrarReservas=="imprimir"||mostrarReservas=="todas") {
      if (fechaInicio) {
        if( mostrarReservas=="imprimir"){
          lista=lista.filter(x=>
            moment(x.checkoutMade).isBetween(moment(fechaInicio).format('YYYY-MM-DD'), 
            moment(fechaInicio).add(cantidadDias,'days').format('YYYY-MM-DD')))
        }
        else if(mostrarReservas=="todas"){
          lista=lista.filter(x=>{
          const listaDias=new Array(moment(x.checkoutEstimated).diff(x.checkinEstimated,"days")).fill(undefined).map((y,i)=>moment(x.checkinEstimated).add(i,'days').format('YYYY-MM-DD'));
          return   listaDias.filter(y=>moment(y).isBetween(moment(fechaInicio).format('YYYY-MM-DD'), 
          moment(fechaInicio).add(cantidadDias,'days'), null,"[]")).length!=0;
        })
       }
      }
    }
    return(
      <React.Fragment>
        <h3>Todas las personas</h3>
      <Checkbox toggle checked={todasLasPersonas} onChange={(e)=>setTodasLasPersonas(!todasLasPersonas)}/>
      <Menu pointing={!isMobile} stackable secondary={!isMobile}>
      <Menu.Item
        name='Adeudados'
        active={mostrarReservas === 'adeudados'}
        onClick={()=>{setRangoFechasOpened(false);setFechaInicio(""); setMostrarReservas("adeudados")}}
      />
      <Menu.Item
        name='Alojados'
        active={mostrarReservas === 'alojados'}
        onClick={()=>{setRangoFechasOpened(false);setFechaInicio(""); setMostrarReservas("alojados")}}
      />
      <Menu.Item
        name='Reservas'
        active={mostrarReservas === 'fllegar'}
        onClick={()=>{setRangoFechasOpened(false);setFechaInicio(""); setMostrarReservas("fllegar")}}
      />
      <Menu.Item
        name='Historico'
        active={mostrarReservas === 'todas'}
        onClick={()=>{setRangoFechasOpened(false);setFechaInicio(""); setMostrarReservas("todas")}}
      />
      <Menu.Item
        position='right'
        name='Imprimir'
        active={mostrarReservas === 'imprimir'}
        onClick={()=>{setRangoFechasOpened(false);setFechaInicio(""); setMostrarReservas("imprimir")}}
      />
    </Menu>
    {(mostrarReservas=="imprimir"||mostrarReservas=="todas")&&<Button onClick={()=>{setRangoFechasOpened(!rangoFechasOpened)}}>Rango de fechas</Button>}
    <br></br>
    
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
    {mostrarReservas!="imprimir"&&<ReactTable noDataText={'No se encontraron registros'} className="-striped -highlight" filterable loadingText={"Cargando..."} loading={false} columns={columns} data={lista}></ReactTable>}
    {mostrarReservas=="imprimir"&&<Imprimir lista={lista}/>}
    </React.Fragment>
    )
  }

export default connect(state=>({isMobile:state.dormis.isMobile}),null)(TablaRegistro)

