import React, {Component} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import {connect} from 'react-redux'
import moment from 'moment'
import {PuedeReservar,HabitacionesDisponibles,ElegirColor} from '../../Functions/utils'
import { Icon} from 'semantic-ui-react'

//ACTIONS
import setReserva from '../../redux/actions/setReserva'
import setModal from '../../redux/actions/setModalReserva'
import setFecha from '../../redux/actions/displayFecha'
import { DataStore } from 'aws-amplify';


const BuscarReserva=(listaReservas,listaReservasAux,index)=>{
  const reserva=listaReservas.find(x=>x.reservationId==listaReservasAux[index].reservationId)
  return reserva
}

const CambioReserva=(rVieja,rNueva)=>{
return rVieja.start!=rNueva.start||rVieja.end!=rNueva.end||rVieja.depto!=rNueva.depto;
}

class Scheduler extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }
  

    cellWidthChange(ev) {
        var checked = ev.target.checked;
        this.setState({
            cellWidthSpec: checked ? "Auto" : "Fixed"
        });
    }
    componentDidMount(){
      const hooked=window.alert
      window.alert=(e)=>{if(e.toLocaleLowerCase().split('daypilot').length==1){hooked(e)}}
    }
    
    render() {
      var {dispatch,listaReservas,fechaInicio,cantidadDias,disable,isMobile,listaDeptos}=this.props;
      let listaReservasAux=JSON.parse(JSON.stringify(listaReservas)).map((x,o)=>x.roomsList.map((y,i)=>({...x,room:y.number}))).flat()
      listaReservasAux=listaReservasAux.map(x=>( {id: x.id, text: x.customersList[0].fullName, start:moment.unix(x.checkinEstimated).format('YYYY-MM-DD'), end: moment.unix(x.checkoutEstimated).format(`YYYY-MM-DD`), resource: x.room }));
     
      //Agrupamos los lugares para mostrarlos
      let obj=[]
        for (var item of listaDeptos){
          if (obj.find(x=>x.id==item.sector)==undefined){
              obj=[...obj,{id:item.sector,name:`Sector ${item.sector}`,expanded: true,}]
            }
        }
        for (var item of obj){
            item.children=listaDeptos.filter(x=>x.sector==item.id).map(x=>({name:x.number,id:x.number})).sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0))
        }

      //Agrupamos los lugares para mostrarlos
      const fechaInicioAux=!fechaInicio?moment().add(-3,"hours").format():moment(fechaInicio).format();
      const config={
          dayNames:true,
          locale: "es-es",
            startDate: fechaInicioAux,
            days: cantidadDias,
            scale: "Day",
            heightSpec:"Max",
            height : 1000,
            treeEnabled : true,
            treePreventParentUsage :true,
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "ddd d"}
            ],
            cellWidth:100,
            eventHeight:35,
            allowEventOverlap: false,
            onBeforeEventDomAdd: args => {
            args.element = <div>
              {args.e.data.text}
                <div style={{position: "absolute", right: isMobile?21:5, top: "9px", width: "17px", height: "17px"}}
                     /*onClick={() => this.deleteEvent(args.e)}*/><Icon name={`${(args.e.data.toolTip&&args.e.data.toolTip.trim()!="")?"edit":""}`}/></div>
              </div>;
            },   
            resources: obj,
            events: listaReservasAux
        };
        return (
        <React.Fragment>
                <DayPilotScheduler
                  {...config}
                  onEventMoved={args => {
                    if (!disable){
                      let checkinEstimated=moment(args.newStart.value);
                      let corroborarFecha=checkinEstimated.diff(args.e.calendar.startDate.value,'days')
                      const rVieja={start:args.e.cache.start.value,end:args.e.cache.end.value,depto:args.e.cache.resource}
                      const rNueva={start:args.e.data.start.value,end:args.e.data.end.value,depto:args.e.data.resource}
                      
                      if (CambioReserva(rVieja,rNueva)&&
                        corroborarFecha>-1&&
                        window.confirm(`Seguro que quieres modificar la estadia de ${args.e.data.text}?`)) {
                       
                          checkinEstimated=checkinEstimated.format("YYYY-MM-DD");
                          const checkoutEstimated=moment(args.newEnd.value).format("YYYY-MM-DD");
                          let ingresoAux=BuscarReserva(listaReservas,listaReservasAux,args.e.data.id);
                          const roomsList=[...ingresoAux.roomsList.filter(x=>x.room!=rVieja.depto),listaDeptos.find(x=>x.room==args.newResource)]
                          const ingreso={...ingresoAux,checkinEstimated,checkoutEstimated,roomsList};
    
                          const onComplete=()=>{this.scheduler.message("Reserva Movida: " + args.e.data.text);}
                          //CambiarEstadoReserva(ingreso,setLoading,onComplete,dispatch,null)
                          this.scheduler.clearSelection()
                      } 
                      else{
                        if  (corroborarFecha<0){
                          alert("La fecha de entrada de la reserva tiene que estar dentro del calendario visible para ser movida")
                        }
                       // RefrescarPrecioYDispo(dispatch)
                      }
                 
                    }
                  else{
                    alert("Solo se puede modificar una reserva en la seccion de confirmadas")
                    window.location.reload(false);
                  }
                  }}
                  bubble={null}
                  onBeforeEventRender={ args => {
                    var paid = args.e.payed;
                    var paidColor = "#aaaaaa";
                    args.data.areas = [
                    //  { bottom: 10, right: isMobile?21:4, html: "<div style='color:" + paidColor + "; font-size: 10pt;'>" + paid + "%</div>", v: "Visible"},
                      { left: 4, bottom: 8, right: 4, height: 2, html: "<div style='background-color:" + paidColor + "; height: 100%; width:" + paid + "%'></div>", v: "Visible" },
                  ];
                  if (isMobile){
                    args.data.areas=[...args.data.areas,
                      {right:2, top:6, bottom:2, width: 20, backColor: "lightblue", html: "&gt;", action:"ResizeEnd"},        
                    ]
                  }
                }}
                  onEventResized={args => {
                    let checkinEstimated=moment(args.newStart.value);
                    let corroborarFecha=1
                    const rVieja={start:args.e.cache.start.value,end:args.e.cache.end.value,depto:args.e.cache.resource}
                    const rNueva={start:args.e.data.start.value,end:args.e.data.end.value,depto:args.e.data.resource}
                    
                    if (!disable){
                      if (CambioReserva(rVieja,rNueva)&&
                          corroborarFecha>-1&&
                        window.confirm(`Seguro que quieres modificar la estadia de ${args.e.data.text}?`)) {
                        checkinEstimated=checkinEstimated.format("YYYY-MM-DD");
                        const checkoutEstimated=moment(args.newEnd.value).format("YYYY-MM-DD");
                        const reserva=BuscarReserva(listaReservas,listaReservasAux,args.e.data.id);
                        const habitacionesDisponibles=HabitacionesDisponibles(checkinEstimated,checkoutEstimated,listaReservas.filter(x=>reserva.reservationId!=x.reservationId))
                            /* if(habitacionesDisponibles.find(x=>x.roomId==reserva))*/
                              const ingreso={...reserva,checkinEstimated,checkoutEstimated};
                                const onComplete=()=>{                      
                                  dispatch(setReserva(reserva));
                                  dispatch(setModal(true))}
                                //CambiarEstadoReserva(ingreso,setLoading,onComplete,dispatch,null)    
                                this.scheduler.clearSelection()
                              }  
                      
                        else{
                          if  (corroborarFecha<0){
                            alert("La fecha de entrada de la reserva tiene que estar dentro del calendario visible")
                          }
                          //RefrescarPrecioYDispo(dispatch)
                        }
                      }
                    else{
                      alert("Solo se puede modificar una reserva en la seccion de confirmadas")
                      window.location.reload(false);
                    }
                  }}
                  onBeforeCellRender = {function(args) {
                    if (args.cell.start.getDatePart().getTime() === new DayPilot.Date().getDatePart().getTime()) {
                      args.cell.backColor = "#fff8b7";
                    
                  }
                  }}
                  onBeforeTimeHeaderRender = {function(args) {
                    args.header.areas = [ {left: 0, top: 0, right: 0, bottom: 0, v: "Hover", action: "JavaScript", js: function(e) { dispatch(setFecha(e.start.value))} } ];
                }}
                  onEventClick={  
                    ars=>{
                      dispatch(setReserva(listaReservas.filter(x=>x.id===ars.e.data.id)[0]));
                      dispatch(setModal(true))
                      this.scheduler.clearSelection()
                      }
                      
                  }
                  onTimeRangeSelected={args => {
                    this.scheduler.clearSelection()
                    const checkinEstimated=moment(args.start.value).format("YYYY-MM-DD");
                    const checkoutEstimated=moment(args.end.value).format("YYYY-MM-DD");
                    const nuevaReserva= {
                      "guests": 2,
                      "children": 0,
                      checkinEstimated,
                      checkoutEstimated,
                      "state": "confirmada",
                      "way": "Presencial",
                      "roomsList":[],
                    }
                  /*  const customersList=[
                        {
                           fullName:"Agustin Albiero",
                           birthdate:moment().unix(),
                           phone:"",
                           dni:"39131620",
                           geo:`{"hit": {"_tags": ["country/ar", "boundary/administrative", "city", "place/town", "source/geonames"], "county": ["Municipio de Villa La Angostura", "Departamento de Los Lagos"], "_geoloc": {"lat": -40.7616, "lng": -71.6448}, "country": "Argentina", "is_city": true, "objectID": "3832711", "postcode": ["8407"], "is_suburb": false, "importance": 16, "is_country": false, "is_highway": false, "is_popular": false, "population": 11063, "admin_level": 8, "country_code": "ar", "locale_names": ["Villa La Angostura"], "administrative": ["Neuquén", "Departamento Los Lagos"], "_highlightResult": {"county": [{"value": "Municipio de Villa La Angostura", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento de Los Lagos", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Argentina", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Villa La Angostura", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Neuquén", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento Los Lagos", "matchLevel": "none", "matchedWords": []}]}}, "name": "Villa La Angostura", "type": "city", "query": "8407", "value": "Villa La Angostura, Neuquén, Argentina", "county": "Municipio de Villa La Angostura", "latlng": {"lat": -40.7616, "lng": -71.6448}, "country": "Argentina", "hitIndex": 1, "postcode": "8407", "highlight": {"name": "Villa La Angostura", "county": "Municipio de Villa La Angostura", "country": "Argentina", "postcode": "<em>8407</em>", "administrative": "Neuquén"}, "postcodes": ["8407"], "rawAnswer": {"hits": [{"_tags": ["city", "country/ph", "place/town", "source/geonames"], "county": ["Province of Surigao del Norte"], "_geoloc": {"lat": 9.53783, "lng": 125.523}, "country": "Filipinas", "is_city": true, "objectID": "1703518", "postcode": ["8407"], "is_suburb": false, "importance": 18, "is_country": false, "is_highway": false, "is_popular": false, "population": 26741, "admin_level": 15, "country_code": "ph", "locale_names": ["Mainit"], "administrative": ["Surigao Del Norte"], "_highlightResult": {"county": [{"value": "Province of Surigao del Norte", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Filipinas", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Mainit", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Surigao Del Norte", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["country/ar", "boundary/administrative", "city", "place/town", "source/geonames"], "county": ["Municipio de Villa La Angostura", "Departamento de Los Lagos"], "_geoloc": {"lat": -40.7616, "lng": -71.6448}, "country": "Argentina", "is_city": true, "objectID": "3832711", "postcode": ["8407"], "is_suburb": false, "importance": 16, "is_country": false, "is_highway": false, "is_popular": false, "population": 11063, "admin_level": 8, "country_code": "ar", "locale_names": ["Villa La Angostura"], "administrative": ["Neuquén", "Departamento Los Lagos"], "_highlightResult": {"county": [{"value": "Municipio de Villa La Angostura", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento de Los Lagos", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Argentina", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Villa La Angostura", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Neuquén", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento Los Lagos", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["country/no", "boundary/administrative", "city", "place/town", "source/geonames"], "county": ["Sortland", "Øksnes"], "_geoloc": {"lat": 68.7054, "lng": 15.4144}, "country": "Noruega", "is_city": true, "objectID": "3137405", "postcode": ["8400", "8401", "8402", "8403", "8404", "8405", "8406", "8407", "8408", "8415", "8416"], "is_suburb": false, "importance": 14, "is_country": false, "is_highway": false, "is_popular": false, "population": 9983, "admin_level": 7, "country_code": "no", "locale_names": ["Sortland"], "administrative": ["Nordland"], "_highlightResult": {"county": [{"value": "Sortland", "matchLevel": "none", "matchedWords": []}, {"value": "Øksnes", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Noruega", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "8400", "matchLevel": "none", "matchedWords": []}, {"value": "8401", "matchLevel": "none", "matchedWords": []}, {"value": "8402", "matchLevel": "none", "matchedWords": []}, {"value": "8403", "matchLevel": "none", "matchedWords": []}, {"value": "8404", "matchLevel": "none", "matchedWords": []}, {"value": "8405", "matchLevel": "none", "matchedWords": []}, {"value": "8406", "matchLevel": "none", "matchedWords": []}, {"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}, {"value": "8408", "matchLevel": "none", "matchedWords": []}, {"value": "8415", "matchLevel": "none", "matchedWords": []}, {"value": "8416", "matchLevel": "none", "matchedWords": []}], "locale_names": [{"value": "Sortland", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Nordland", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["place/village", "country/al", "city", "source/osm", "place"], "county": ["Bashkia Bulqizë"], "_geoloc": {"lat": 41.5288, "lng": 20.445}, "country": "Albania", "is_city": true, "objectID": "7228872_728423637", "postcode": ["8407"], "is_suburb": false, "importance": 19, "is_country": false, "is_highway": false, "is_popular": false, "population": 2138, "admin_level": 15, "country_code": "al", "locale_names": ["Gjoricë e Sipërme", "Gjoricë"], "administrative": ["Shqipëria veriore"], "_highlightResult": {"county": [{"value": "Bashkia Bulqizë", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Albania", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Gjoricë e Sipërme", "matchLevel": "none", "matchedWords": []}, {"value": "Gjoricë", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Shqipëria veriore", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["place/village", "country/al", "city", "source/osm", "place"], "county": ["Bashkia Bulqizë"], "_geoloc": {"lat": 41.5638, "lng": 20.4286}, "country": "Albania", "is_city": true, "objectID": "7161953_728419892", "postcode": ["8407"], "is_suburb": false, "importance": 19, "is_country": false, "is_highway": false, "is_popular": false, "population": 1191, "admin_level": 15, "country_code": "al", "locale_names": ["Okshatinë", "Shupenzë", "Boçovë"], "administrative": ["Shqipëria veriore"], "_highlightResult": {"county": [{"value": "Bashkia Bulqizë", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Albania", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Okshatinë", "matchLevel": "none", "matchedWords": []}, {"value": "Shupenzë", "matchLevel": "none", "matchedWords": []}, {"value": "Boçovë", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Shqipëria veriore", "matchLevel": "none", "matchedWords": []}]}}], "query": "8407", "nbHits": 5, "params": "hitsPerPage=5&language=es&type=city&aroundLatLngViaIP=false&query=8407", "degradedQuery": false, "processingTimeMS": 3}, "countryCode": "ar", "administrative": "Neuquén"}`,
                           email:"titiloxx"
                        }
                    ]*/
                    dispatch(setReserva(nuevaReserva));
                    dispatch(setModal(true))
                    //nuevaReserva.customersList=customersList;
                    //dispatch({type:"LOAD_RESERVATION",payload:nuevaReserva})
                   
                 }}
                  ref={component => { this.scheduler = component && component.control; }}
                />
      </React.Fragment>
        );
    }
}

export default connect(state=>({checkoutTime:state.checkoutTime,listaDeptos:state.listaDeptos,refrescarDispoYPrecios:state.refrescarDispoYPrecios,isMobile:state.isMobile}),null)(Scheduler)



