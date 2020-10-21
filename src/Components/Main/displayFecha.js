import React from "react"
import moment from 'moment'
import {Col,Row,Input,Modal,InputGroupText, ModalHeader, ModalBody, ModalFooter,InputGroup,InputGroupAddon,Label,Container } from 'reactstrap';
import {connect} from 'react-redux'
import { Button, Card,Header, Segment,Icon } from 'semantic-ui-react'

//ACTIONS
import setFecha from '../../redux/actions/displayFecha'
import setModal from '../../redux/actions/setModalReserva'
import setReserva from '../../redux/actions/setReserva'
import {CapitalFirst,InformacionReservas} from '../../Functions/utils'

export const DisplayFecha = ({fecha,listaReservas,dispatch,mostrarFull}) => {
   const informacionReservasAux=InformacionReservas(listaReservas,fecha)
   const informacionReservas=fecha?{entran:informacionReservasAux.entran.filter(x=>x.state!="cancelada"),
                              estancias:informacionReservasAux.estancias.filter(x=>x.state!="cancelada"),
                              salen:informacionReservasAux.salen.filter(x=>x.state!="cancelada")}:[]
   if(!fecha){
     return null;
   }
   return (
      <Row>
        <Col xs={12} md={4}>  
          <Header style={{cursor:'pointer'}} onClick={()=>dispatch(setFecha(moment().format()))} as='h2' icon textAlign='center' attached='top'>
            <Icon name='sign-in' color={"blue"} circular />
            <Header.Content>Entradas ({informacionReservas.entran.reduce((a,b)=>1+a,0)})</Header.Content>
          </Header>
          {mostrarFull&&
          <Segment attached>
            <Card.Group>

          {informacionReservas.entran.map((x,i)=>(
                  <Card key={i} onClick={()=>{dispatch(setModal(true));dispatch(setReserva(x))}}>
                    <Card.Content>
                      <Card.Header>{x.customersList[0].fullName} ({x.guests})</Card.Header>
                       <Card.Meta>{`${x.way} - ${x.roomsList[0].room}`}</Card.Meta>
                      <Card.Description>
                        <Row>
                          <Col xs={12}>
                            {moment(x.checkinEstimated).format("DD MMM").split('.').join("")}
                            <Icon name="arrow right"></Icon>
                            {moment(x.checkoutEstimated).format("DD MMM").split('.').join("")}
                            {` (${x.nights} ${x.nights==1?"noche":"noches"})`}
                          </Col>
                        </Row>
                      </Card.Description>
                    </Card.Content>
                </Card>
          ))}
          
        
           </Card.Group>
          </Segment>}
        </Col>

      <Col xs={12} md={4}>  
      <Header  style={{cursor:'pointer'}} onClick={()=>dispatch(setFecha(moment().format()))} as='h2' icon textAlign='center' attached='top'>
            <Icon name='home' color={"blue"} circular />
            <Header.Content>Estancias ({informacionReservas.estancias.reduce((a,b)=>1+a,0)})</Header.Content>
          </Header>
        {mostrarFull&&
          <Segment attached>
          <Card.Group>
          {informacionReservas.estancias.map((x,i)=>(
                  <Card key={i} onClick={()=>{dispatch(setModal(true));dispatch(setReserva(x))}}>
                    <Card.Content>
                      <Card.Header>{x.customersList[0].fullName} ({x.guests})</Card.Header>
                       <Card.Meta>{`${x.way} - ${x.roomsList[0].room}`}</Card.Meta>
                      <Card.Description>
                        <Row>
                          <Col xs={12}>
                            {moment(x.checkinEstimated).format("DD MMM").split('.').join("")}
                            <Icon name="arrow right"></Icon>
                            {moment(x.checkoutEstimated).format("DD MMM").split('.').join("")}
                            {` (${x.nights} ${x.nights==1?"noche":"noches"})`}
                          </Col>
                        </Row>
                      </Card.Description>
                    </Card.Content>
                </Card>
          ))}
        </Card.Group>
      </Segment>}
      </Col>

      <Col xs={12} md={4}>  
      <Header style={{cursor:'pointer'}} onClick={()=>dispatch(setFecha(moment().format()))} as='h2' icon textAlign='center' attached='top'>
            <Icon name='sign-out' color={"blue"} circular />
            <Header.Content>Salidas ({informacionReservas.salen.reduce((a,b)=>1+a,0)})</Header.Content>
          </Header>
        {mostrarFull&&
          <Segment attached>
          <Card.Group>
          {informacionReservas.salen.map((x,i)=>(
                  <Card key={i}  onClick={()=>{dispatch(setModal(true));dispatch(setReserva(x))}}>
                    <Card.Content>
                      <Card.Header>{x.customersList[0].fullName} ({x.guests})</Card.Header>
                       <Card.Meta>{`${x.way} - ${x.roomsList[0].room}`}</Card.Meta>
                      <Card.Description>
                        <Row>
                          <Col xs={12}>
                            {moment(x.checkinEstimated).format("DD MMM").split('.').join("")}
                            <Icon name="arrow right"></Icon>
                            {moment(x.checkoutEstimated).format("DD MMM").split('.').join("")}
                            {` (${x.nights} ${x.nights==1?"noche":"noches"})`}
                          </Col>
                        </Row>
                      </Card.Description>
                    </Card.Content>
                </Card>
          ))}
        </Card.Group>
      </Segment>}
      </Col>
     </Row>

   
    )
}

const ModalDisplayFecha=({fecha,listaReservas,dispatch,mostrarFull})=>{
  return(
  <Modal style={{maxWidth:"1000px"}} size={"lg"} isOpen={fecha!=null} toggle={()=>{dispatch(setFecha(null));}} >
  <ModalHeader style={{borderBottom:"none"}} toggle={()=>{dispatch(setFecha(null));}}
  ><Header as='h2'>{CapitalFirst(moment(fecha).format("dddd DD/MM/YYYY"))}</Header>
  </ModalHeader>
  <ModalBody>
    <DisplayFecha fecha={fecha} listaReservas={listaReservas} dispatch={dispatch} mostrarFull={mostrarFull}/>
</ModalBody>
</Modal>)
}

export default connect(state=>({listaReservas:state.listaReservas}),null)(ModalDisplayFecha)

