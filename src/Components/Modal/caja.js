import React,{useState,useEffect} from "react"
import ReactTable from 'react-table-6'
import moment from 'moment'
import LoadingOverlay from 'react-loading-overlay';
import { Col,Row,Input,InputGroupText,InputGroup,InputGroupAddon,Container,Button as ButtonR} from 'reactstrap';
import {/*AgregarServicios,DevolverComponentes*/} from '../../Functions/utils'
import {connect} from 'react-redux'
import { Icon } from 'semantic-ui-react'
import  Pagos  from './pagos'
import { Button,Input as SemanticInput} from 'semantic-ui-react'


const Precios=({setPrecio,precios,setDescripcion,setComponentes,componentes,ingreso})=>{
  const [menor,setMenor]=useState(0)
  const [mayor,setMayor]=useState(0)
  const [remolque,setRemolque]=useState(0)
  const [carpa,setCarpa]=useState(0)
  const [vehiculo,setVehiculo]=useState(0)
  const [mchico,setMChico]=useState(0)
  const [mgrande,setMGrande]=useState(0)
  const [camper,setCamper]=useState(0)
  useEffect(()=>{
    if(componentes){
      if(componentes.menor){
        setMenor(componentes.menor)
      }
      if(componentes.mayor){
        setMayor(componentes.mayor)
      }
      if(componentes.remolque){
        setRemolque(componentes.remolque)
      }
      if(componentes.carpa){
        setCarpa(componentes.carpa)
      }
      if(componentes.vehiculo){
        setVehiculo(componentes.vehiculo)
      }
      if(componentes.mchico){
        setMChico(componentes.mchico)
      }
      if(componentes.mgrande){
        setMGrande(componentes.mgrande)
      }
      if(componentes.camper){
        setCamper(componentes.camper)
      }
    }
  },[ingreso])

  useEffect(()=>{
    let obj={}
    //Solo cargamos los componentes que tienen algo asi no hay sobrecarga de informacion
    if (menor){
      obj={...obj,menor}
    }
    if (mayor){
      obj={...obj,mayor}
    }
    if (remolque){
      obj={...obj,remolque}
    }
    if (carpa){
      obj={...obj,carpa}
    }
    if (vehiculo){
      obj={...obj,vehiculo}
    }
    if (mchico){
      obj={...obj,mchico}
    }
    if (mgrande){
      obj={...obj,mgrande}
    }
    if (camper){
      obj={...obj,camper}
    }
    setComponentes(obj)
    setPrecio(
    (precios.menor?menor*precios.menor:0)+
    (precios.mayor?mayor*precios.mayor:0)+
    (precios.remolque?remolque*precios.remolque:0)+
    (precios.carpa?carpa*precios.carpa:0)+
    (precios.vehiculo?vehiculo*precios.vehiculo:0)+
    (precios.mchico?mchico*precios.mchico:0)+
    (precios.mgrande?mgrande*precios.mgrande:0)+
    (precios.camper?camper*precios.camper:0)
    )
   let description='';
   if (menor){
     description+=`${menor} ${menor==1?'menor':'menores'} `;
   }
   if (mayor){
     description+=`${mayor} ${mayor==1?'mayor':'mayores'} `;
   }
   if (remolque){
     description+=`${remolque} ${remolque==1?'remolque':'remolques'} `;
   }
   if (carpa){
     description+=`${carpa} ${carpa==1?'carpa':'carpas'} `;
   }
   if (vehiculo){
     description+=`${vehiculo} ${vehiculo==1?'vehiculo':'vehiculos'} `;
   }
   if (mchico){
     description+=`${mchico} ${mchico==1?'mchico':'mchicos'} `;
   }
   if (mgrande){
     description+=`${mgrande} ${mgrande==1?'mgrande':'mgrandes'} `;
   }
   if (camper){
     description+=`${camper} ${camper==1?'camper':'campers'} `;
   }
   setDescripcion(description)
  },[menor,mayor,remolque,carpa,vehiculo,mchico,mgrande,camper])

  for(var item of Object.keys(precios))
  {
    if (precios[item]==0){
      delete precios[item];
    }
  }

  const elegirValue=(nombre)=>{
    let ret=""
    switch (nombre) {
      case 'menor':
        ret={val:menor,setVal:setMenor}
        break;
      case 'mayor':
        ret={val:mayor,setVal:setMayor}
        break;
      case 'vehiculo':
        ret={val:vehiculo,setVal:setVehiculo}
        break;
      case 'carpa':
        ret={val:carpa,setVal:setCarpa}
        break;
      case 'mchico':
        ret={val:mchico,setVal:setMChico}
        break;
      case 'mgrande':
        ret={val:mgrande,setVal:setMGrande}
        break;
      case 'camper':
        ret={val:camper,setVal:setCamper}
        break;
      case 'remolque':
        ret={val:remolque,setVal:setRemolque}
        break;
    }
    return ret
  }
  return(
    <React.Fragment>
      <Container>
        <Row>

        {Object.keys(precios).map(x=>(
          <Col xs={12} md={3} style={{backgroundColor:elegirValue(x).val?'#00b5ad':'#fff',borderRadius:'5%'}}>{   
            <React.Fragment>
              <Col xs={12} style={{textAlign: 'center',size:'16px',fontWeight:'bold',color:elegirValue(x).val?'#fff':'black'}}>{x.toUpperCase()}</Col> 
              <Col xs={12}>
              <div class="d-flex justify-content-center">
              <SemanticInput placeholder='Cantidad'>
                    <Icon onClick={()=>{if(elegirValue(x).val!=0)elegirValue(x).setVal(elegirValue(x).val-1)}} name='minus' style={{marginTop:'10px',color:elegirValue(x).val?'#fff':'black'}} size={'large'} link position={'left'}/>
                    <input style={{marginBottom:'10px', textAlign:'center',width:'100px',fontSize:'16px'}} value={elegirValue(x).val} onChange={(e)=>elegirValue(x).setVal(e.target.value)}/>
                    <Icon onClick={()=>{elegirValue(x).setVal(elegirValue(x).val+1)}} name='plus' style={{marginTop:'10px',color:elegirValue(x).val?'#fff':'black'}} size={'large'} link/>
                </SemanticInput>
              </div>
              
              </Col> 
            </React.Fragment>
           
        }
        </Col>
        ))}
        </Row>
      </Container>
    </React.Fragment>
  )
}

export const Caja = ({dispatch,reserva:ingreso,precios,isMobile}) => {
  const [tipo,setTipo]=useState("noches")
  const [quantity,setQuantity]=useState(1)
  const [precio,setPrecio]=useState(0)
  const [costo,setCosto]=useState(0)
  const [descuento,setDescuento]=useState(0)
  const [descripcion,setDescripcion]=useState("")
  const [componentes,setComponentes]=useState()
  const [descripcionPrecios,setDescripcionPrecios]=useState("")
  const [loading,setLoading] =useState(false);
  const [service,setService] =useState(null);
    useEffect(()=>{
      if(ingreso.servicesList.length==0){
        setQuantity(ingreso.nights)
        setTipo('noches')
      }

    },[ingreso])
    
    useEffect(()=>{
      setCosto(parseInt(precio*quantity*(1-(descuento/100))))
    },[precio])

    useEffect(()=>{
      if (quantity<0) {
        //alert("Las noches tienen que ser positivas")
        setQuantity(0)
      }
      if (tipo=="noches"||tipo=="") {
        setDescripcion(`${quantity} ${(quantity==1)?"noche":"noches"} ${descripcionPrecios}${descuento!=0?`[${descuento}% Desc]`:""}`)
      }
    },[quantity,ingreso,descripcionPrecios,descuento])
    useEffect(()=>{

      if (costo<0) {
        //alert("El importe tiene que ser positivo")
        setCosto(0)
      }

    },[costo])
    useEffect(()=>{

      setCosto(parseInt(precio*quantity*(1-(descuento/100))))

    },[quantity])

    
    const ReiniciarPagos=()=>{
     /* setTipo("Pago")
      setDescripcion("1 noche");
      setImporte(0)
      setForma("")
      setNoches(1)
      setMediaEstadia(false)
      setNumeroHoja(false)
      setCondicion("Contado")*/
    }


    var paymentColumn = [
    {
    Header: '',
    accessor: 'date',
    style:{fontSize:"1.1rem"},
    headerStyle:{fontSize:"1.2rem"},
   
    Cell: props =>(moment(props.value).format('DD/MM/YYYY - hh:mm a')),
    filterable: false
      },
    {
    Header: '',
    accessor: 'isRefund',
    style:{fontSize:"1.1rem"},
    headerStyle:{fontSize:"1.2rem"},
  
    filterable: false,
    Cell: props =>(props.value?"Devolucion":"Pago"),
      },
    {
    Header: '',
    accessor: 'amount',
    style:{fontSize:"1.1rem"},
    headerStyle:{fontSize:"1.2rem"},
    
     Cell: props =>`$ ${props.value}`,
    filterable: false
      },
    {
    Header: '',
    accessor: 'method',
    style:{fontSize:"1.1rem"},
    headerStyle:{fontSize:"1.2rem"},
 
    filterable: false
      },
    
    ]
    var serviceColumn = [
    {
    Header: 'Fecha de creacion',
    accessor: 'date',
    style:{fontWeight:"bold",fontSize:"1.2rem"},
    headerStyle:{fontSize:"1.2rem"},
    
    Cell: props =>(moment(props.value).format('DD/MM - hh:mm a')),
    filterable: false
      },

    {
    Header: 'Descripcion',
    accessor: 'description',
    width:340,
    style:{fontWeight:"bold",fontSize:"1.2rem"},
    headerStyle:{fontSize:"1.2rem"},
    filterable: false,
    Cell: props =>(<div style={{textAlign:"center"}}>{props.value}</div>),
      },
    {
    Header: 'Valor',
    accessor: 'cost',
  
    style:{fontWeight:"bold",fontSize:"1.2rem"},
    headerStyle:{fontSize:"1.2rem"},
     Cell: props =>`$ ${props.value}`,
    filterable: false
      },
    {
    Header: 'Saldo',
    accessor: 'due',
  
    style:{fontWeight:"bold",fontSize:"1.2rem"},
    headerStyle:{fontSize:"1.2rem"},
     Cell: props =>`$ ${props.value}`,
    filterable: false
      },
    {
    Header: 'Pago/Devolucion',
   
    style:{fontWeight:"bold",fontSize:"1.2rem"},
    headerStyle:{fontSize:"1.2rem"},
     Cell: props =>(<div style={{cursor:"pointer"}}><Icon  onClick={()=>{setService(props.original)}} size='large' style={{marginLeft:"5px"}} name='plus square'/></div>),
    filterable: false
      },
    ]

  const hojaNumeroAux=parseInt(Math.random()*10000)*2;
  const tipos=["noches","otros"]
 return (
    <React.Fragment>
      <LoadingOverlay
      active={loading}
      spinner
      text='Agregando'
      >
          <Pagos setService={setService} service={service} loading={loading} setLoading={setLoading} />
          {/*<Precios ingreso={ingreso} precios={precios} setPrecio={setPrecio} setDescripcion={setDescripcionPrecios} setComponentes={setComponentes} 
            componentes={ingreso.servicesList.length==0?DevolverComponentes(ingreso):JSON.parse(ingreso.servicesList.sort(function(a, b){return moment(b.date).diff(moment(a.date))})[0].components)}/>*/}
          <Row>
            
            <Col xs={12} md={2}> 
                <h3>Tipo</h3><Input value={tipo} onChange={(e)=>{setTipo(e.target.value)}}
                type="select">{tipos.map((x,i)=>(<option key={i}>{x}</option>))}</Input>
              </Col>

              <Col xs={12} md={2}> 
                <h3>Cantidad</h3><Input value={quantity} type="number" onChange={(e)=>{setQuantity(e.target.value)}}
               />
              </Col>

            <Col xs={12} md={4} > 
              <h3>Descripcion</h3><Input  type="textarea" value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}
              />
              </Col>

            <Col xs={12} md={4}> 
          
              <Row style={{marginBottom:"10px",marginTop:"10px"}}>
                <Col xs={5}> <h3>Valor</h3></Col>
              {/* <Col xs={7}> <h3 style={{float: "right"}}>${ingreso.servicesList[0].perNight} x noche</h3></Col>*/}
              </Row>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                      <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <Input type="number" style={{fontSize:"26px",fontWeight:800}} value={costo} onChange={(e)=>{
                  const descuent=100-Math.ceil(100*e.target.value/(precio*quantity));
                  setDescuento(descuent<0?0:descuent);setCosto(e.target.value)}}/>
                  <InputGroupAddon addonType="append">
                   <ButtonR disabled={loading}
                            id={"buttonDisc"} style={{float:"right"}} onClick={()=>{
                            const num= descuento==0?10:0;
                            setDescuento(num)
                            const descuent=num>100?100:num;
                            setCosto(parseInt(precio*quantity*(1-(descuent/100))))
} } color="info" size={"lg"}
                      >%</ButtonR>
                  </InputGroupAddon>
                  {descuento!=0&&
                    <Input type="number" style={{fontSize:"26px",fontWeight:800}} value={descuento} onChange={(e)=>{
                      const descuent=e.target.value>100?100:e.target.value;
                      setCosto(parseInt(precio*quantity*(1-(descuent/100))))
                      setDescuento(descuent)}
                    }/>
                  }
                </InputGroup>
          </Col>
          </Row>
          <br></br>
          <Container>
            <Row>
              <Col style={{display: "contents"}}>
              <Button.Group vertical={isMobile} style={{margin: "auto"}} widths={ingreso.state=='confirmada'?'3':'2'}>
                <Button size='big' color='teal' fluid onClick={()=>{
                    if (tipo=="") {
                      alert("falta agregar el tipo de servicio")
                    }
                    else if (costo=="") {
                      alert("falta agregar el valor")
                    }
                    else{
                      setLoading(true)
                   //   AgregarServicios(ingreso.reservationId,{cost:costo,quantity,name:tipo,description:descripcion,components:JSON.stringify(componentes)},dispatch,setLoading,setService)
                    }
                    }}>Pagar Ahora</Button>
                {!isMobile&&<Button.Or text={"o"}/>}
                <Button size='big' color='grey' fluid onClick={()=>{
                    if (tipo=="") {
                      alert("falta agregar el tipo de servicio")
                    }
                    else if (costo=="") {
                      alert("falta agregar el valor")
                    }
                    else{
                      setLoading(true)
                     /* AgregarServicios(ingreso.reservationId,{cost:costo,quantity,name:tipo,description:descripcion,components:JSON.stringify(componentes)},dispatch,setLoading)*/
                    }
                    }}>Pagar Luego</Button>
                </Button.Group>
              </Col>
            </Row>
           </Container>
           <br/>

          <br/>
          <br/>
          <Row>
            {/*<Col xs={12} md={5}><h5>Ingreso: {moment(ingreso.fechaIngreso).format('dddd DD - hh:mm a')}</h5></Col>*/}
          </Row>
          <br/>
          <Row>
            <Col xs={12} md={{size:12}} >
            
            </Col>
          </Row>
          
          <br/>
            <ReactTable 
            
            defaultPageSize={5}
            noDataText={'No hay pagos'} 
            className="-striped -highlight" 
            filterable 
            loadingText={"Cargando..."} 
            
            loading={false} columns={serviceColumn} 
            SubComponent={row => {
              
              return (
                <ReactTable 
                defaultPageSize={7}
                noDataText={'No hay pagos'} 
                className="-striped -highlight" 
                filterable 
                showPagination= {false}
                
                loadingText={"Cargando..."}
                loading={false} columns={paymentColumn}
                data={row.original.paymentsList.sort(function(a, b){return moment(b.date).diff(moment(a.date))})} />
              )
            }}
            data={ingreso.servicesList.sort(function(a, b){return moment(b.date).diff(moment(a.date))})} />
            <br/>

            <Row>
              {/* <Col xs={4} >
                <h3 style={{textAlign:"center"}}>Noches pagas</h3>
              </Col>
             <Col xs={8}>
                <h3>{ingreso.nochesPagas}</h3>
          </Col>*/}
            </Row>
            <Row>
              <Col xs={4} >
                <h3>Total abonado ${ingreso.servicesList.map(x=>x.paid).reduce((a,b) => a + b, 0)}</h3>
              </Col>
              <Col xs={8}>
                <h4></h4>
              </Col>
            </Row>
        
            <Row>
              {/*<Col xs={4} >
                <h4 style={{textAlign:"center"}}>Total Cta corriente</h4>
            </Col>
              <Col xs={8}>
                <h4>${ingreso.listaPagos.filter(x=>x.condicion=="Cta/cte").map(x=>x.importe).reduce((a,b) => a + b, 0)}</h4>
              </Col>*/}
            </Row>
            </LoadingOverlay>
      </React.Fragment>
   
    )
}



export default connect(state=>({listaReservas:state.listaReservas,refrescarDispoYPrecios:state.refrescarDispoYPrecios,precios:state.precios,isMobile:state.isMobile}),null)(Caja)

