import React,{useState,useEffect} from "react"
import { Button,Col,Row,Input,InputGroupText,InputGroup,InputGroupAddon,Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';
//import {AgregarPagos} from '../../Functions/utils'
import {connect} from 'react-redux'


export const Pagos = ({loading,setLoading,service,setService,dispatch,precios}) => {
  const [tipo,setTipo]=useState("Pago")
  const [importe,setImporte]=useState(0)
  const [forma,setForma]=useState("")
  const [numeroHoja,setNumeroHoja] =useState(false);

  useEffect(()=>{
    if (service) {
      setImporte(service.due)
    }
   
  },[service])
  useEffect(()=>{

    if (importe<0) {
      //alert("El importe tiene que ser positivo")
      setImporte(0)
    }

  },[importe])
  const tipos=["Pago","Devolucion"]
  var formas=["","Efectivo","Tarjeta"]

 const hojaNumeroAux=parseInt(Math.random()*10000)*2;
 return (
    <React.Fragment>

      <Modal style={{maxWidth:"600px"}} isOpen={service!=null} toggle={()=>{setService(null)}} >
      {service&&
          <ModalHeader style={{borderBottom:"none",fontSize:"20px !important"}} toggle={()=>{setService(null);}}
          >{`Pagar ${service.description?service.description:service.name}`}
          </ModalHeader>}
          <ModalBody>
          <Row>
              
              <Col xs={12} > 
              <h3 onClick={()=>setNumeroHoja(!numeroHoja)} style={{color:(false)?"green":"black"}}>Tipo</h3><Input value={tipo} onChange={(e)=>{setTipo(e.target.value)}}
              type="select">{tipos.map((x,i)=>(<option key={i}>{x}</option>))}</Input>
              </Col>
              <Col xs={12} md={6}> 
              <h3>Forma</h3><Input id={"selectCondicion"} name="forma" value={forma} onChange={(e)=>{if(e.target.value=="Efectivo"){setNumeroHoja(true)}; setForma(e.target.value)}}
              type="select">{formas.map((x,i)=>(<option key={i}>{x}</option>))}</Input>
              </Col>
            <Col xs={12} md={6}> 
            <Row>
              <Col xs={5}> <h3>Importe</h3></Col>
            </Row>
              <InputGroup>
              <InputGroupAddon addonType="prepend">
                    <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                  <Input type="number" style={{fontSize:"26px",fontWeight:800}} value={importe} onChange={(e)=>{setImporte(e.target.value)}}/>
                  <InputGroupAddon addonType="append">
                    <Button disabled={loading} id={"buttonTest"} style={{float:"right"}} color="info" size={"lg"} onClick={()=>{
                if (forma==""){
                  alert("Falta poner la forma de pago")
                }
                else{
                  if (importe&&importe<1) {
                    alert("El importe tiene que ser positivo y distinto de 0")
                  }
                  else{
                    setLoading(true)
                    const onComplete=()=>{setService(null)}
                    const pago={
                      amount:importe,
                      method:forma, 
                      isRefund:tipo=="Devolucion"
                    }
                    if(service.due>=0){
                      //AgregarPagos(service.serviceId,pago,dispatch,setLoading,onComplete)
                    }
                    else{
                      //En un futuro cambiar esto
                     // AgregarPagos(service.serviceId,pago,dispatch,setLoading,onComplete)
                    }
                  }
                
                  
                }}}>{tipo=="Devolucion"?"Devolver":"Pagar"}</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
                {/*<Col xs={12} md={4} > 
              <h3>Descripcion</h3><Input  type="textarea" value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}
              />
              </Col>*/}
          
            </Row>
          
          </ModalBody>
        </Modal>
        
      </React.Fragment>
   
    )
}



export default connect(null,null)(Pagos)

