import React,{useState,useEffect} from 'react'
import ReactTable from 'react-table-6'
import moment from 'moment'
import printJS from 'print-js'
import {Row,Col} from 'reactstrap'
import { Button } from 'semantic-ui-react'

const PrintFunc=(lista)=>{
    printJS({gridStyle: 'text-align:center;border: 1px solid #d7d7d7;',printable: lista, properties: ['Nombre y Apellido', 'Procedencia','DNI/PASAP', 'Edad', 'Vehiculos','Fecha De Ingreso','Fecha De Egreso'], type: 'json'})
}

const Imprimir=({lista})=>{
  const mappedLis=lista.map(x=>({
    'Nombre y Apellido':x.customersList[0].fullName,
    'DNI/PASAP':x.customersList[0].dni,
    'Edad':x.customersList[0].age,
    'Procedencia':x.customersList[0].geo?JSON.parse(x.customersList[0].geo).value:"-",
    'Vehiculos':x.vehiclesList.length>0?x.vehiclesList.map(y=>(`${y.brand.toUpperCase()} ${y.plate}`)).toString().replace(/,/g,' | '):"-",
    'Fecha De Ingreso':moment(x.checkinMade).format("DD MMM YYYY hh:mm"),
    'Fecha De Egreso':moment(x.checkoutMade).format("DD MMM YYYY hh:mm"),
  }))
    var columns = [
        {
        Header: 'Nombre y Apellido',
        accessor: 'Nombre y Apellido',
        sortable:false,
        filterable: false
        },
        {
            Header: 'DNI/PASAP',
            accessor: 'DNI/PASAP',
            sortable:false,
            filterable: false
        },
        {
            Header: 'Procedencia',
            accessor: 'Procedencia',
            sortable:false,
            filterable: false
        },
        {
            Header: 'Edad',
            accessor: 'Edad',
            sortable:false,
            filterable: false
        },
        {
            Header: 'Vehiculos',
            accessor: 'Vehiculos',
            sortable:false,
            filterable: false
        },
        {
            Header: 'Fecha De Ingreso',
            accessor: 'Fecha De Ingreso',
            sortable:false,
            filterable: false
        },
        
        {
            Header: 'Fecha De Egreso',
            accessor: 'Fecha De Egreso',
            sortable:false,
            filterable: false
        },
        ]
   
    return(
      <React.Fragment>
        <br></br>
        <Row>
            <Col xs={1}>
                <Button basic color='blue' onClick={()=>{PrintFunc(mappedLis)}}>
                    Imprimir
                </Button>   
            </Col>
        </Row>

        <ReactTable noDataText={'No se encontraron registros'} className="-striped -highlight" filterable loadingText={"Cargando..."} loading={false} columns={columns} data={mappedLis}></ReactTable>
    </React.Fragment>
    )
  }

export default Imprimir

