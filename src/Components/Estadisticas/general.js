import React,{useState,useEffect,useRef} from 'react'
import moment from 'moment'
import {Col,Row,Modal,InputGroupText, ModalHeader, ModalBody, ModalFooter,InputGroup,InputGroupAddon,Label,Container } from 'reactstrap';
import { Input,Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {ModificarPrecios,ObtenerEstadisticas,ObtenerEstadisticasDiarias,ObtenerEstadisticaActual,ObtenerEstadisticaIngresosDeHoy,CapitalFirst} from '../../../Funciones/utils'
import {Line} from 'react-chartjs-2';
import { Divider, Header, Icon, Table,Segment } from 'semantic-ui-react'
import DateRangePicker from '../extras/dateRangePicker';
import {Collapse} from 'react-collapse';
import {Pie as Doughnut} from 'react-chartjs-2';

const createChartTemplate=()=>{
return {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Personas',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
}
const createDonusTemplate=()=>{
return {
    labels: [
      'Ocupado',
      'Libre'
    ],
    datasets: [{
      data: [300, 50],
      backgroundColor: [
        '#80ffcc',
      '#8585ad',
      
      ],
      hoverBackgroundColor: [
        '#80ffcc',
      '#8585ad',
      ]
    }]
  };
}
const personas = createChartTemplate();
const vehiculos = createChartTemplate();
const registros = createChartTemplate();
const donusActual=createDonusTemplate()
const donusIngresaron=createDonusTemplate()

const style={
  header:{textAlign: 'center',fontSize:'20px'},
  item:{fontSize:'16px'}
}

const Estadisticas=({listaDeptos,isMobile})=>{
const [granularidad,setGranularidad]=useState('mensual')
const [fechaInicio,setFechaInicio]=useState(moment().format('YYYY-MM-DD'))
const [fechaFin,setFechaFin]=useState(moment().add(1,'days').format('YYYY-MM-DD'))
const [rangoFechasOpened,setRangoFechasOpened]=useState(true)
const startRef=useRef();
const endRef=useRef();

const estadisticasGrafico=ObtenerEstadisticasDiarias(fechaInicio)
const estadisticasNumeros=ObtenerEstadisticas(fechaInicio,fechaFin)
const estadisticasActuales=ObtenerEstadisticaActual()
const estadisticasIngresosHoy=ObtenerEstadisticaIngresosDeHoy()

personas.labels=estadisticasGrafico.map(x=>moment(x.fecha).format('DD'))
vehiculos.labels=estadisticasGrafico.map(x=>moment(x.fecha).format('DD'))
registros.labels=estadisticasGrafico.map(x=>moment(x.fecha).format('DD'))
donusIngresaron.labels=['Entraron','Salieron']
donusActual.datasets[0].data=[estadisticasIngresosHoy.ocupacion,listaDeptos.length]
donusIngresaron.datasets[0].data=[estadisticasIngresosHoy.menores+estadisticasIngresosHoy.mayores,estadisticasIngresosHoy.mayoresSalieron+estadisticasIngresosHoy.menoresSalieron]
vehiculos.datasets[0].label='Vehiculos'
registros.datasets[0].label='Registros creados'

personas.datasets[0].data=estadisticasGrafico.map(x=>x.mayores+x.menores)
vehiculos.datasets[0].data=estadisticasGrafico.map(x=>x.vehiculos)
registros.datasets[0].data=estadisticasGrafico.map(x=>x.registros)
return(
  <React.Fragment>
     <Segment>
       <Row>
        <Col  xs={12} md={6} style={style.header}>
          <Container>
            <Header as='h1' textAlign='center'>
                  Ahora
            </Header>
            <Row>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Personas: {estadisticasActuales.mayores+estadisticasActuales.menores}</Header>
              </Col>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Vehiculos: {estadisticasActuales.vehiculos}</Header>
              </Col>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Carpas: {estadisticasActuales.carpas}</Header>
              </Col>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Registros: {estadisticasActuales.registros}</Header>
              </Col>
            </Row>
            <Container>
              {!isMobile&&<Doughnut data={donusActual} options={{title:{text:'Lugares',display:true,fontSize:18}}}/>}
            </Container>
            </Container>
        </Col>
        {!isMobile&&<Divider vertical>
            <Header as='h4'>
             
            </Header>
          </Divider>}

        <Col  xs={12}  md={6} style={style.header}>
          {isMobile&&<br></br>}
          {isMobile&&<br></br>}
          <Container>
            <Header as='h1' textAlign='center'>
                    Ingresaron hoy
            </Header>
            <Row>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Personas: {estadisticasIngresosHoy.mayores+estadisticasIngresosHoy.menores}</Header>
              </Col>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Vehiculos: {estadisticasIngresosHoy.vehiculos}</Header>
              </Col>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Carpas: {estadisticasIngresosHoy.carpas}</Header>
              </Col>
              <Col  md={6} xl={3} style={style.header}>
                  <Header style={{marginTop:'7px'}} as='h2'>Registros: {estadisticasIngresosHoy.registros}</Header>
              </Col>
            </Row>
            <Container>
            {!isMobile&&<Doughnut data={donusIngresaron} options={{title:{text:'Personas',display:true,fontSize:18}}}/>}
            </Container>
          </Container>
        </Col>
      </Row>
    </Segment>
    <Divider horizontal>
      <Header as='h4'>
        .
      </Header>
    </Divider>

    <Container>
      {/*<Header as='h1' textAlign='center'>
             Buscar
        </Header>*/}

      <Collapse isOpened={rangoFechasOpened}>
        <Col xs={12}>
          <DateRangePicker startRef={startRef} endRef={endRef}/>
          <Button basic color='blue' size={"big"} onClick={()=>{
            const inicioFixed=startRef.current.value.split("/").reverse().join("-")
            const salidaFixed=endRef.current.value.split("/").reverse().join("-")
            setFechaInicio(inicioFixed);
            setFechaFin(salidaFixed);
          }}>
            Buscar 
          </Button>
        </Col>
    </Collapse>
    <Divider horizontal>
      <Header as='h4'>
        .
      </Header>
    </Divider>
      <Row>
        <Col  xs={6} md={3} style={style.header}>
            <Header style={{marginTop:'7px'}} as='h2'>Personas: {parseInt(estadisticasNumeros.mayores)+parseInt(estadisticasNumeros.menores)}</Header>
        </Col>
        <Col  xs={6} md={3} style={style.header}>
            <Header style={{marginTop:'7px'}} as='h2'>Vehiculos: {estadisticasNumeros.vehiculos}</Header>
        </Col>
        <Col  xs={6} md={3} style={style.header}>
            <Header style={{marginTop:'7px'}} as='h2'>Carpas: {estadisticasNumeros.carpas}</Header>
        </Col>
        <Col  xs={6} md={3} style={style.header}>
            <Header style={{marginTop:'7px'}} as='h2'>Registros: {estadisticasNumeros.registros}</Header>
        </Col>
      </Row>
      </Container>

    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
      </Header>
    </Divider>
     
          <Header as='h1' textAlign='center'>
           {CapitalFirst(moment(fechaInicio).format('MMMM'))}
          </Header>
      
      <Row>

      <Col xs={12} md={4}style={style.header}>
          <Line data={personas}  options={{scales:{ticks:{stepSize:1},display:true}, title:{text:'Personas',display:true,fontSize:18}}}/>
      </Col>

      <Col xs={12} md={4} style={style.header}>
          <Line data={vehiculos}  options={{title:{text:'Vehiculos',display:true,fontSize:18}}}/>
      </Col>

      <Col xs={12} md={4} style={style.header}>
          <Line data={registros}  options={{title:{text:'Registros creados',display:true,fontSize:18}}}/>
      </Col>

      </Row>

  </React.Fragment>
    
)
}

export default connect(state=>({listaDeptos:state.dormis.listaDeptos,listaReservas:state.dormis.listaReservas,isMobile:state.dormis.isMobile}),null)(Estadisticas)
