import React from "react"
import {Col,Row } from 'reactstrap';
import moment from "moment"
const SecondPage = ({ingreso:x}) => 
{
    {console.log(x)}
    const ingreso={
        'nombreyape':x.customersList.map(x=>x.fullName).join('\n'),
        'mayores':x.customersList.length,
        'menores':"",
        'dni':x.customersList[0].dni,
        'edad':x.customersList[0].age,
        'procedencia':x.customersList[0].geo?JSON.parse(x.customersList[0].geo).value:"-",
        'vehiculos':x.vehiclesList.length>0?x.vehiclesList.map(y=>(`${y.brand.toUpperCase()} ${y.plate}`)).toString().replace(/,/g,' | '):"-",
        'lugar':x.roomsList.map(x=>x.room).join(' ').toLowerCase(),
        'Fecha De Ingreso':moment(x.checkinMade).format("DD MMM YYYY hh:mm"),
        'Fecha De Egreso':moment(x.checkoutMade).format("DD MMM YYYY hh:mm"),
      }
    const size="20px";
    return(
        <React.Fragment >
            <div id="printFirma" style={{'content-visibility':"hidden"}}>
                <h3 style={{textAlign:"center"}}>{`Fecha de ingreso ${moment(ingreso.fechaIngreso).format('DD/MM/YYYY')}`}</h3>
                <br></br>
                <Col xs={12}><h3>Pasajeros</h3></Col>
                <table style={{textAlign:"left"}}>
                    <tr>
                        <td >Nombre y Apellido</td>
                        <td>DNI/PASAP</td>
                        <td>Edad</td>
                        <td>Procedencia</td>
                    </tr>
                    {x.customersList.map(y=>(
                        <React.Fragment>
                          <tr><td>{y.fullName}</td>
                          <td>{y.dni}</td>
                          <td>{y.age}</td>
                          <td>{y.geo?JSON.parse(y.geo).value:"-"}</td></tr>
                        </React.Fragment>
                    ))}
                 </table>
                <br></br>
                <br></br>
                <Row style={{fontSize:size}}>
                <Col xs={2}><h3>Vehiculos</h3> {ingreso.vehiculos}</Col>
                    <Col xs={4}><h3>Lugares de estadia</h3> {ingreso.lugar}</Col>
                    {/* <Col xs={4}><h3>Grupo</h3> 
                        <Col xs={6}>Menores: {ingreso.menores}</Col>
                        <Col xs={6}>Mayores: {ingreso.mayores}</Col>
                    </Col> */}
                </Row>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row>
                    <Col xs={{size:12,offset:1}}><h4>Firma del delegado ________________________________________________________________</h4></Col>
                </Row>
            </div>
        </React.Fragment>
    );  
}
export default SecondPage