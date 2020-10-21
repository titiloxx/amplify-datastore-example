import React,{useState,useEffect,useRef} from "react"
//import {Normalizar,CargarDNI,HabitacionesDisponibles,CambiarEstadoReserva,MandarFormularioDepto,PuedeReservar} from '../../Functions/utils'
import {HabitacionesDisponibles,Normalizar} from '../../Functions/utils'
import moment from 'moment'
import {connect} from 'react-redux'
import { Button,Col,Row,Input,InputGroup,InputGroupAddon,Container} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import PhoneInput from 'react-phone-input-2'
import TablaVehiculos from './tablaVehiculos'
import TablaPersonas from './tablaPersonas'
import { Button as ButtonSemantic,Icon } from 'semantic-ui-react'
import places from 'places.js'
import 'react-phone-input-2/lib/style.css'
//Actions
import setModal from '../../redux/actions/setModalReserva'

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const SacarDeLista=async(lista,setLista,valor)=>{
  if (window.confirm(`¿Seguro desea eliminar el lugar ${valor.room} de este registro?`)){
  setLista(lista.filter(x=>x!=valor))
  }
}

const MandarIngreso=(listaDeptos,listaPersonas,vehiculos,fechaIngreso,fechaSalida,ingreso,hora,checkinMode,nuevaReserva,setLoading,dispatch,testFunction,goToPayment,onComplete)=>{
  if (
    moment(fechaIngreso).isValid()==""||
    moment(fechaSalida).isValid()==""
    ){
    alert("Alguna de las fechas no tiene formato valido")
    }
    else if (
    fechaIngreso.trim()==""||
    fechaSalida.trim()==""
    ){
    alert("Faltan completar fechas")
    }
    else if(listaDeptos.length==0){
      alert("Falta poner lugar")
    }
    else if(listaPersonas.length==0){
      alert("Debes cargar al menos una persona en el registro")
    }

    else{
      const customersList=listaPersonas;
      if (checkinMode&&!ingreso.checkinMade){
        ingreso.checkinMade=moment().unix()
        ingreso.state="checkin"
      }
      ingreso.checkinEstimated=moment(fechaIngreso).unix()
      ingreso.checkoutEstimated=moment(fechaSalida).set({hour:hora.split(':')[0],minute:0,second:0,millisecond:0}).add(-3,'hours').unix()
      const vehiclesList=vehiculos.map(x=>{
        const {tableData,...s}=x
        return s;
      });
      const servicesList=nuevaReserva?[]:ingreso.servicesList;
      const roomsList=nuevaReserva?listaDeptos.map(x=>x.id):listaDeptos
      const nuevoIngreso={
        ...ingreso,
        guests:0,
        way:"",
        roomsList,
        customersList,
        servicesList,
        vehiclesList
      }
     // const puedeReservar=PuedeReservar(moment(ingreso.checkinEstimated).format('YYYY-MM-DD'),moment(ingreso.checkoutEstimated).format('YYYY-MM-DD'),{...nuevoIngreso,roomsList:listaDeptos})
      if(false/*!puedeReservar.resultado*/){
        //alert(`Error: El lugar ${puedeReservar.habitacion.room} no esta disponible para las fechas elegidas`)
      }
      else{
        if (nuevaReserva){
          dispatch({type:"SAVE_RESERVATION",payload:nuevoIngreso})
        }
        else{
          //CambiarEstadoReserva(nuevoIngreso,setLoading,onComplete,dispatch,null)
        }
      }
    }
}

//Tambien aca se carga la reserva editada
export const NuevaReserva = ({reserva:ingreso,dispatch,testFunction,nuevaReserva,isMobile,goToPayment}) => 
{  
const [nombre, setNombre] = useState("");
const [personas, setPersonas] = useState("2");
const [edad, setEdad] = useState('');
const [listaDeptos, setListaDeptos] = useState([]);
const [fechaIngreso, setFechaIngreso] = useState("");
const [fechaSalida, setFechaSalida] = useState("");
const [modoReserva, setModoReserva] = useState("Presencial");
const [listaPersonas, setListaPersonas] = useState([]);
const [dni, setDni] = useState("");
const [telefono, setTelefono] = useState("");
const [customerId, setCustomerId] = useState(0);
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [argolia, setArgolia] = useState("");
const [placesAutocomplete, setPlacesAutocomplete] = useState("");
const [buscandoDNI, setBuscandoDNI] = useState(false);
const [recargar,setRecargar]= useState(1);
const [hora,setHora]= useState('11:00');
const [listIndex,setListIndex]= useState(0);
useEffect(() => {
if(ingreso.customersList){
  const phoneAux=ingreso.customersList[0].phone?ingreso.customersList[0].phone.split(' ').join(''):'';
  setNombre(ingreso.customersList[0].fullName)
  setEmail(ingreso.customersList[0].email)
  setEdad(ingreso.customersList[0].age==0?"":ingreso.customersList[0].age)
  setTelefono(phoneAux)
  setPersonas(ingreso.guests)
  setDni(ingreso.customersList[0].dni)
  setModoReserva(ingreso.way)
  setListaPersonas(ingreso.customersList)
  setCustomerId(ingreso.customersList[0].customerId)
}
  setHora(moment(ingreso.checkoutEstimated).add(3,'hours').format("HH:mm"))
  setListaDeptos(ingreso.roomsList)
  setFechaIngreso(moment(ingreso.checkinEstimated).format("YYYY-MM-DD"))
  setFechaSalida(moment(ingreso.checkoutEstimated).format("YYYY-MM-DD"))
  var placesAutocomplete = places({
    appId: "plT9TSUAMCB9",
    apiKey: "df2addcb9735cb59bfdc55a75fe946e6",
    container: document.querySelector('#address-input')
  });
  placesAutocomplete.configure({
    type: 'city',
    aroundLatLngViaIP: false,
  })
  placesAutocomplete.on('change', (e)=>setArgolia(e.suggestion));

 if (ingreso.customersList&&ingreso.customersList[0]&&ingreso.customersList[0].geo){
  placesAutocomplete.setVal(JSON.parse(ingreso.customersList[0].geo)?JSON.parse(ingreso.customersList[0].geo).value:'')
 }
 setPlacesAutocomplete(placesAutocomplete)
 },[ingreso]);

 const noches=moment(fechaSalida).diff(moment(fechaIngreso),"days")
 const vehiculos=ingreso.vehiclesList?ingreso.vehiclesList:[];
 const setVehiculos=(a)=>{ingreso.vehiclesList=a; setRecargar(Math.random()*1000000)};
 const onComplete=()=>{goToPayment()}
 const habitacionesDisponible=HabitacionesDisponibles(fechaIngreso,fechaSalida)
 let listaHorarios=''
  for (let y of ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']) {
    listaHorarios=[...listaHorarios,`${y}:00`]
  }
return (
    <LoadingOverlay
    active={loading}
    spinner
    text='Agregando'
    >
    
    <Row>
      <Col xs={12} md={4}> <h3>Nombre y Apellido *</h3><Input disabled={buscandoDNI} value={nombre} onChange={(e)=>setNombre(e.target.value)} name="nombre" id={"nombre"}></Input></Col>
      <Col xs={12} md={3}> 
        <h3>Documento identidad</h3>
        <InputGroup>
        <Input value={dni} disabled={buscandoDNI} onKeyDown={(e)=>{if(e.keyCode == 13){/*CargarDNI(dni,setBuscandoDNI,setNombre)*/}}} onChange={(e)=>setDni(e.target.value)} name="dni" id={"dni"}></Input>
          <InputGroupAddon addonType="append">
            <Button onClick={()=>{
              if(dni.trim()!="")
              {/*CargarDNI(dni,setBuscandoDNI,setNombre)*/}
              else{
                alert("Para buscar hay que agregar dni")
              }
            
            }} color={"info"}>🔎</Button>   
          </InputGroupAddon> 
        </InputGroup>
      </Col>
      <Col xs={12} md={2}> <h3>Edad</h3><Input id="edad" name="edad"  value={edad}  onChange={(e)=>setEdad(e.target.value)}></Input></Col>
      <Col xs={12} md={3}> <h3>Email</h3><Input id="email" name="email" type={'email'} value={email}  onChange={(e)=>setEmail(e.target.value)}></Input></Col>
    </Row>
  
    {!isMobile&&<br></br>}
    <Row>
 
    <Col xs={12} md={4}> <h3>Telefono</h3><PhoneInput country={'ar'} value={telefono}onChange={phone => setTelefono( phone )}/></Col>
    <Col xs={12} md={4}> <h3>Cuidad/CP</h3><input type="search" id="address-input"  /></Col>
    <Col xs={12} md={4}>     
    <br></br>          
    <br></br>          
    <ButtonSemantic.Group vertical={isMobile} style={{margin: "auto"}} widths={ingreso.state=='confirmada'?'3':'2'}>
                <ButtonSemantic size='big' color='teal' fluid onClick={()=>{
                  if (nombre.trim()=="") {
                    alert('falta completar nombre')
                  }
                  else{
                    setListaPersonas([...listaPersonas.filter(x=>x.dni!=dni),{
                      fullName:Normalizar(nombre),
                      dni,
                      phone:telefono.length>6?telefono:null,
                      email:email??null,
                      geo:JSON.stringify(argolia)??"",
                      birthdate:moment().subtract(edad,'years').unix()
                    }]);
                    setNombre("")
                    setDni("")
                    setTelefono("")
                    setEdad("")
                    setEmail("")
                    setCustomerId('')
                    setListIndex(-1);
                  }
                 
                
                
                }}>Nuevo</ButtonSemantic>
                {!isMobile&&listaPersonas.length!=0&&listIndex!=-1&&<ButtonSemantic.Or text={"o"}/>}
                {listaPersonas.length!=0&&listIndex!=-1&&<ButtonSemantic size='big' color='grey' fluid onClick={()=>{
                    if (nombre.trim()=="") {
                      alert('falta completar nombre')
                    }
                    else{
                      listaPersonas[listIndex]={
                      customerId,
                      fullName:Normalizar(nombre),
                      dni,
                      phone:telefono.length>6?telefono:null,
                      email:email?email:null,
                      geo:JSON.stringify(argolia),
                      birthdate:moment().subtract(edad,'years').format()
                    }
                      setListaPersonas(listaPersonas)
                      setRecargar(Math.random()*1000000)
                }}}>Guardar</ButtonSemantic>}
      </ButtonSemantic.Group>

    </Col>
    <br></br>
    <Col xs={12} md={8}><h3>Personas ({listaPersonas.length})</h3>

     <TablaPersonas data={JSON.parse(JSON.stringify(listaPersonas))} 
     setNombre={setNombre} setEmail={setEmail} setEdad={setEdad} setTelefono={setTelefono} setPersonas={setPersonas}
     setDni={setDni} setListaPersonas={setListaPersonas} listIndex={listIndex} setCustomerId={setCustomerId} recargar={()=>setRecargar(Math.random()*1000000)} setListIndex={setListIndex} listaPersonas={listaPersonas} setArgolia={placesAutocomplete.setVal}></TablaPersonas>
  </Col>
    <Col xs={12} md={4}><h3>Vehiculos ({vehiculos.length})</h3>
     <TablaVehiculos data={vehiculos} setData={setVehiculos} reservationId={ingreso.reservationId}></TablaVehiculos>
  </Col>

 </Row>
 <br></br>
  <Row>
    <Col xs={12} md={{size:3,offset:2}}> <h3>Fecha entrada</h3><Input  type="date"  value={fechaIngreso} onChange={(e)=>setFechaIngreso(e.target.value)}></Input></Col>
    <Col xs={12} md={{size:3}}> <h3>Fecha salida</h3><Input  type="date"  value={fechaSalida} onChange={(e)=>setFechaSalida(e.target.value)}></Input></Col>
          <Col xs={12} md={{size:2}}> <h3>Hora de salida</h3><Input type="select"  value={hora} onChange={(e)=>setHora(e.target.value)}>{listaHorarios.map(x=><option>{x}</option>)}</Input></Col>
 </Row>
    
<br></br>
 
  <br></br>
  <Row>
    <Col xs={4} md={{size:2,offset:3}}><h3>Lugares</h3></Col>
    <Col xs={8} md={{size:3}}>{listaDeptos.map(x=>(<a href="#" onClick={()=>{SacarDeLista(listaDeptos,setListaDeptos,x)}} className="and btand btn btn-info" style={{margin: '0px 7px 7px', overflow: 'hidden'}}>{x.number+"  "}<Icon name="trash alternate" /></a>))}</Col>
      {/*<Col xs={6} md={2}><h3>{ingreso.roomsList[0].room}</h3></Col>*/}
      <Col xs={12} md={2}>
        <Input type={'select'} onChange={(e)=>{setListaDeptos([...listaDeptos.filter(x=>x.roomId!=e.target.value),
          habitacionesDisponible.find(x=>(x.id==e.target.value))])}}>
          {habitacionesDisponible.map(x=><option value={x.id}>{x.number}</option>)}
        </Input> 
      </Col> 
  </Row>
  <br></br>
  <Row>
    <Col xs={6} md={{size:3,offset:3}}><h3>Noches</h3></Col>
    <Col xs={6} md={2}><h3>{noches}</h3></Col>
  </Row>

  <br></br>
  <Container>
    <Row>
    <Col style={{display: "contents"}}>
      <ButtonSemantic.Group vertical={isMobile} style={{margin: "auto"}} widths={ingreso.state=='confirmada'?'3':'2'}>
        {(nuevaReserva||ingreso.state=='confirmada')&&<ButtonSemantic size='big' color='green' disabled={loading} onClick={()=>{
          MandarIngreso(listaDeptos,listaPersonas,vehiculos,fechaIngreso,fechaSalida,ingreso,hora,true,nuevaReserva,setLoading,dispatch,testFunction,goToPayment,onComplete)}}>CheckIn</ButtonSemantic>}
        {!isMobile&&ingreso.state=='confirmada'&&<ButtonSemantic.Or text={"o"}/>}
        {!isMobile&&nuevaReserva&&<ButtonSemantic.Or text={"o"}/>}
        <ButtonSemantic size='big' color='teal' disabled={loading} onClick={()=>{
        MandarIngreso(listaDeptos,listaPersonas,vehiculos,fechaIngreso,fechaSalida,ingreso,hora,false,nuevaReserva,setLoading,dispatch,testFunction,goToPayment,onComplete)
      }}>{!nuevaReserva?"Guardar":"Agregar reserva"}</ButtonSemantic>
        {!isMobile&&!nuevaReserva&&<ButtonSemantic.Or text={"o"}/>}
        {!nuevaReserva&&(ingreso.checkoutMade?
              <ButtonSemantic size='big'  color='grey' onClick={()=>{

                if (window.confirm("¿Seguro quieres cancelar el checkout?")){
                  const onComplete=()=>{
                  dispatch(setModal(false))}
                  ingreso.checkoutMade=null;
                  ingreso.state='checkin'
                  /*CambiarEstadoReserva(ingreso,setLoading,onComplete,dispatch,null)*/
                  }
      
                }}
              >Cancelar checkout</ButtonSemantic>:
      ingreso.checkinMade?  
      <ButtonSemantic disabled={loading} size='big'  color='orange' onClick={()=>{
        const onComplete=()=>{
          dispatch(setModal(false))}
          ingreso.checkoutMade=moment().add(3,"hours").format();
          ingreso.state='checkout'
         /* CambiarEstadoReserva(ingreso,setLoading,onComplete,dispatch,null)*/
        }}
      >Checkout</ButtonSemantic>
      :
      ingreso.state=="confirmada"?
      <ButtonSemantic disabled={loading} size='big'  color='grey' onClick={()=>{

      if (window.confirm("¿Seguro quieres cancelar la reserva?")){
        const onComplete=()=>{
        dispatch(setModal(false))}
        ingreso.state='cancelada'
        /*CambiarEstadoReserva(ingreso,setLoading,onComplete,dispatch,null)*/
        }

      }}
     >Cancelar Registro</ButtonSemantic>
     : <ButtonSemantic disabled={loading} size='big'  color='blue' onClick={()=>{

      if (window.confirm("¿Seguro quieres confirmar otra vez la reserva?")){
        const onComplete=()=>{
        dispatch(setModal(false))}
        ingreso.checkoutMade=null;
        ingreso.state='confirmada'
        /*CambiarEstadoReserva(ingreso,setLoading,onComplete,dispatch,null)*/
        }

      }}
     >Reconfirmar reserva</ButtonSemantic>
)}
     
      </ButtonSemantic.Group>
    </Col>
    </Row>
  </Container>
  <Row>

  </Row>
  </LoadingOverlay>
 
)}

export default connect(state=>({listaPrecios:state.listaPrecios,informacionHotel:state.informacionHotel,listaReservas:state.listaReservas,isMobile:state.isMobile}),null)(NuevaReserva)

