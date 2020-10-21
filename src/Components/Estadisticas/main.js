import React,{useState} from 'react'
import {connect} from 'react-redux'
import General from './general'
import Pagos from './pagos'
import { Menu,Input,Segment,Icon } from 'semantic-ui-react'

const Mapa=({mapInfo,listaDeptos,fecha,listaReservas,dispatch})=>{
const [mostrarMenu,setMostrarMenu]=useState("general")
return(
  <React.Fragment>
     <Segment>
        <Menu pointing secondary >
        <Menu.Item
            name='General'
            active={mostrarMenu === 'general'}
            onClick={()=>{setMostrarMenu("general")}}
        />
        <Menu.Item
            name='Pagos'
            active={mostrarMenu === 'pagos'}
            onClick={()=>{setMostrarMenu("pagos")}}
        />
        </Menu>
     {mostrarMenu=="general"&& <General/>}
     {mostrarMenu=="pagos"&& <Pagos/>}
    </Segment>
  </React.Fragment>
    
)
}

export default connect(state=>({mapLink:state.dormis.mapLink,mapInfo:state.dormis.mapInfo,listaDeptos:state.dormis.listaDeptos,listaReservas:state.dormis.listaReservas,isMobile:state.dormis.isMobile}),null)(Mapa)
