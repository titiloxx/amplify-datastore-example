import React,{useState,useEffect,useRef} from 'react'
import moment from 'moment'
import {Col,Row,Container } from 'reactstrap';
import { Input,Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {ObtenerListaPagosFecha,CapitalFirst,ListaFechas, ObtenerEstadisticas} from '../../../Funciones/utils'
import {Line} from 'react-chartjs-2';
import { Divider, Header, Icon, Table,Segment } from 'semantic-ui-react'
import DateRangePicker from '../extras/dateRangePicker';
import {Collapse} from 'react-collapse';
import {Pie as Doughnut} from 'react-chartjs-2';

const createLineChartTemplate=()=>{
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Cantidad',
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
        'Pagado',
        'Devuelto'
      ],
      datasets: [{
        data: [300, 50],
        backgroundColor: [
        '#80ffcc',
        '#FA8072',
        
        ],
        hoverBackgroundColor: [
          '#80ffcc',
        '#FA8072',
        ]
      }]
    };
  }
  
const style={
    header:{textAlign: 'center',fontSize:'20px'},
    item:{fontSize:'16px'}
  }
const Estadisticas=({listaDeptos,isMobile})=>{
const [granularidad,setGranularidad]=useState('mensual')
const [fechaInicio,setFechaInicio]=useState(moment().format('YYYY-MM-DD'))
const [fechaFin,setFechaFin]=useState(moment().add(1,'days').format('YYYY-MM-DD'))
const [rangoFechasOpened,setRangoFechasOpened]=useState(true)
const startRef=useRef()
const endRef=useRef()
var columns = [
  {
  Header: 'Fecha',
  accessor: 'created',
  
  sortMethod:(a, b, desc) => {
      if (moment(a).diff(moment(b),"minutes") > 0) {
        return 1
      }
      else{
          return -1
      }
    
    },
  Cell: props => props.value,
  filterable: false
    }]
const estadisticasGrafico=ObtenerListaPagosFecha(moment().format())
const donusActualPagos=createDonusTemplate()
const donusActualForma=createDonusTemplate()
const linePagos=createLineChartTemplate()

donusActualPagos.datasets[0].data=[estadisticasGrafico.filter(x=>!x.isRefund).reduce((acom,current)=>acom+current.amount,0),estadisticasGrafico.filter(x=>x.isRefund).reduce((acom,current)=>acom+current.amount,0)]
donusActualForma.datasets[0].data=[estadisticasGrafico.filter(x=>!x.isRefund).filter(x=>x.method=='Efectivo').reduce((acom,current)=>acom+current.amount,0),estadisticasGrafico.filter(x=>x.method=='Tarjeta').reduce((acom,current)=>acom+current.amount,0)]
donusActualForma.labels=["Efectivo","Tarjeta"]

const listaFechas=ListaFechas(fechaInicio,fechaFin);

linePagos.datasets[0].data=listaFechas.map(x=>ObtenerListaPagosFecha(x)).map(y=>y.reduce((acom,current)=>acom+current.amount,0));
linePagos.labels=listaFechas.map(x=>moment(x).format('DD/MM'));

return(
  <React.Fragment>
     <Segment>

     <Row>
        <Col  xs={12} md={6} style={style.header}>
          <Container>
            <Header as='h1' textAlign='center'>
                  Pagos y devoluciones
            </Header>
 
            <Container>
              {!isMobile&&<Doughnut data={donusActualPagos} options={{title:{text:'',display:true,fontSize:18}}}/>}
            </Container>
            </Container>
        </Col>
        <Col  xs={12} md={6} style={style.header}>
          <Container>
            <Header as='h1' textAlign='center'>
                Forma de pagos
            </Header>

            <Container>
              {!isMobile&&<Doughnut data={donusActualForma} options={{title:{text:'',display:true,fontSize:18}}}/>}
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
        <Col  xs={12} md={12} style={style.header}>
        <Header style={{marginTop:'7px',textAlign:'center'}} as='h2'>Cobrado en el periodo: ${linePagos.datasets[0].data.reduce((acom,current)=>acom+current,0)}</Header>
        </Col>
      </Row>
      </Container>

    <Divider horizontal>
      <Header as='h4'>
        <Icon name='bar chart' />
      </Header>
    </Divider>
     

        <Row>
          <Col xs={12} md={{offset:2,size:8}} style={style.header}>
              <Line data={linePagos}  options={{scales:{ticks:{stepSize:1},display:true}, title:{text:'Cobrado por dia',display:true,fontSize:18}}}/>
          </Col>
        </Row>
  </React.Fragment>
    
)
}

export default connect(state=>({listaDeptos:state.dormis.listaDeptos,listaReservas:state.dormis.listaReservas,isMobile:state.dormis.isMobile}),null)(Estadisticas)
