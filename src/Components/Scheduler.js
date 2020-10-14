import React, {Component,useState,useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import Zoom from "./Zoom";
import { DataStore } from '@aws-amplify/datastore';
import {Reserva} from '../models/index'
import moment from 'moment'

const ActualizarDatastore=async (state,setState)=>{
   const reservas= await DataStore.query(Reserva);
   const rAux=reservas.map(x=>( {id: x.id, text: x.description, start: x.checkinEstimated, end: x.checkoutEstimated, resource: x.resource }));
   setState({...state,events:rAux})
}

const Scheduler=()=>{
       const [state,setState]=useState({
            startDate: "2019-10-01",
            days: 31,
            scale: "Day",
            timeHeaders: [
                { groupBy: "Month"},
                { groupBy: "Day", format: "d"}
            ],
            cellWidthSpec: "Auto",
            cellWidth: 50,
            resources: [
                {name: "Resource A", id: "A"},
                {name: "Resource B", id: "B"},
                {name: "Resource C", id: "C"},
                {name: "Resource D", id: "D"},
                {name: "Resource E", id: "E"},
                {name: "Resource F", id: "F"},
                {name: "Resource G", id: "G"}
            ],
            events:[]
        })
        useEffect(() => {
            const subscription = DataStore.observe(Reserva).subscribe((msg) => {
                ActualizarDatastore(state,setState);
            });
            ActualizarDatastore(state,setState)
            return () => subscription.unsubscribe();
          }, []);
        var {...config} = state;
        
        return (
            <div>

                <DayPilotScheduler
                  {...config}
                  onEventMoved={args => {
                      console.log("Event moved: ", args.e.data.id, args.newStart, args.newEnd, args.newResource);
                  }}
                  onEventResized={args => {
                      console.log("Event resized: ", args.e.data.id, args.newStart, args.newEnd);
                  }}
                  onTimeRangeSelected={args => {
                    DayPilot.Modal.prompt("New event name", "Event").then(modal => {
                      if (!modal.result) {
                        return;
                      }
                     const nuevaReserva={
                         children: 0,
                         guests: "1",
                         checkoutEstimated: `${args.end}`,
                         checkinEstimated: `${args.start}`,
                         created: moment().format(),
                         description: modal.result,
                         resource:args.resource
                     }
                      DataStore.save(new Reserva(nuevaReserva));
                    });
                  }}
                />
            </div>
        );
    }


export default Scheduler;
