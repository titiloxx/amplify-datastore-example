import React, {Component,useState,useEffect} from 'react';
import {DayPilot, DayPilotScheduler} from "daypilot-pro-react";
import { Reservations, Customers} from '../../models/index'
import moment from 'moment'
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import {ActualizarDatastore,CargarReserva} from '../../Functions/utils'


const Scheduler=()=>{
        const [session,setSession]= useState();
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
            Auth.currentSession().then(x=>{
                setSession(x);
              })
            const subscription = DataStore.observe(Reservations).subscribe((msg) => {
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
                         checkoutEstimated: moment(args.end.value).unix(),
                         checkinEstimated: moment(args.start.value).unix(),
                         created: moment().unix(),
                         description: modal.result,
                         state:"confirmada",
                         way:"presencial",
                         resource:args.resource/*,
                         username:session?.accessToken?.payload.username,
                         usergroup:session?.accessToken?.payload["cognito:groups"].filter(x=>x!="admin")[0]*/
                     }
                     const customersList=[
                         {
                            fullName:"Agustin Albiero",
                            birthdate:moment().unix(),
                            phone:"",
                            dni:"39131620",
                            geo:`{"hit": {"_tags": ["country/ar", "boundary/administrative", "city", "place/town", "source/geonames"], "county": ["Municipio de Villa La Angostura", "Departamento de Los Lagos"], "_geoloc": {"lat": -40.7616, "lng": -71.6448}, "country": "Argentina", "is_city": true, "objectID": "3832711", "postcode": ["8407"], "is_suburb": false, "importance": 16, "is_country": false, "is_highway": false, "is_popular": false, "population": 11063, "admin_level": 8, "country_code": "ar", "locale_names": ["Villa La Angostura"], "administrative": ["Neuquén", "Departamento Los Lagos"], "_highlightResult": {"county": [{"value": "Municipio de Villa La Angostura", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento de Los Lagos", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Argentina", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Villa La Angostura", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Neuquén", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento Los Lagos", "matchLevel": "none", "matchedWords": []}]}}, "name": "Villa La Angostura", "type": "city", "query": "8407", "value": "Villa La Angostura, Neuquén, Argentina", "county": "Municipio de Villa La Angostura", "latlng": {"lat": -40.7616, "lng": -71.6448}, "country": "Argentina", "hitIndex": 1, "postcode": "8407", "highlight": {"name": "Villa La Angostura", "county": "Municipio de Villa La Angostura", "country": "Argentina", "postcode": "<em>8407</em>", "administrative": "Neuquén"}, "postcodes": ["8407"], "rawAnswer": {"hits": [{"_tags": ["city", "country/ph", "place/town", "source/geonames"], "county": ["Province of Surigao del Norte"], "_geoloc": {"lat": 9.53783, "lng": 125.523}, "country": "Filipinas", "is_city": true, "objectID": "1703518", "postcode": ["8407"], "is_suburb": false, "importance": 18, "is_country": false, "is_highway": false, "is_popular": false, "population": 26741, "admin_level": 15, "country_code": "ph", "locale_names": ["Mainit"], "administrative": ["Surigao Del Norte"], "_highlightResult": {"county": [{"value": "Province of Surigao del Norte", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Filipinas", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Mainit", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Surigao Del Norte", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["country/ar", "boundary/administrative", "city", "place/town", "source/geonames"], "county": ["Municipio de Villa La Angostura", "Departamento de Los Lagos"], "_geoloc": {"lat": -40.7616, "lng": -71.6448}, "country": "Argentina", "is_city": true, "objectID": "3832711", "postcode": ["8407"], "is_suburb": false, "importance": 16, "is_country": false, "is_highway": false, "is_popular": false, "population": 11063, "admin_level": 8, "country_code": "ar", "locale_names": ["Villa La Angostura"], "administrative": ["Neuquén", "Departamento Los Lagos"], "_highlightResult": {"county": [{"value": "Municipio de Villa La Angostura", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento de Los Lagos", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Argentina", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Villa La Angostura", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Neuquén", "matchLevel": "none", "matchedWords": []}, {"value": "Departamento Los Lagos", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["country/no", "boundary/administrative", "city", "place/town", "source/geonames"], "county": ["Sortland", "Øksnes"], "_geoloc": {"lat": 68.7054, "lng": 15.4144}, "country": "Noruega", "is_city": true, "objectID": "3137405", "postcode": ["8400", "8401", "8402", "8403", "8404", "8405", "8406", "8407", "8408", "8415", "8416"], "is_suburb": false, "importance": 14, "is_country": false, "is_highway": false, "is_popular": false, "population": 9983, "admin_level": 7, "country_code": "no", "locale_names": ["Sortland"], "administrative": ["Nordland"], "_highlightResult": {"county": [{"value": "Sortland", "matchLevel": "none", "matchedWords": []}, {"value": "Øksnes", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Noruega", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "8400", "matchLevel": "none", "matchedWords": []}, {"value": "8401", "matchLevel": "none", "matchedWords": []}, {"value": "8402", "matchLevel": "none", "matchedWords": []}, {"value": "8403", "matchLevel": "none", "matchedWords": []}, {"value": "8404", "matchLevel": "none", "matchedWords": []}, {"value": "8405", "matchLevel": "none", "matchedWords": []}, {"value": "8406", "matchLevel": "none", "matchedWords": []}, {"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}, {"value": "8408", "matchLevel": "none", "matchedWords": []}, {"value": "8415", "matchLevel": "none", "matchedWords": []}, {"value": "8416", "matchLevel": "none", "matchedWords": []}], "locale_names": [{"value": "Sortland", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Nordland", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["place/village", "country/al", "city", "source/osm", "place"], "county": ["Bashkia Bulqizë"], "_geoloc": {"lat": 41.5288, "lng": 20.445}, "country": "Albania", "is_city": true, "objectID": "7228872_728423637", "postcode": ["8407"], "is_suburb": false, "importance": 19, "is_country": false, "is_highway": false, "is_popular": false, "population": 2138, "admin_level": 15, "country_code": "al", "locale_names": ["Gjoricë e Sipërme", "Gjoricë"], "administrative": ["Shqipëria veriore"], "_highlightResult": {"county": [{"value": "Bashkia Bulqizë", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Albania", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Gjoricë e Sipërme", "matchLevel": "none", "matchedWords": []}, {"value": "Gjoricë", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Shqipëria veriore", "matchLevel": "none", "matchedWords": []}]}}, {"_tags": ["place/village", "country/al", "city", "source/osm", "place"], "county": ["Bashkia Bulqizë"], "_geoloc": {"lat": 41.5638, "lng": 20.4286}, "country": "Albania", "is_city": true, "objectID": "7161953_728419892", "postcode": ["8407"], "is_suburb": false, "importance": 19, "is_country": false, "is_highway": false, "is_popular": false, "population": 1191, "admin_level": 15, "country_code": "al", "locale_names": ["Okshatinë", "Shupenzë", "Boçovë"], "administrative": ["Shqipëria veriore"], "_highlightResult": {"county": [{"value": "Bashkia Bulqizë", "matchLevel": "none", "matchedWords": []}], "country": {"value": "Albania", "matchLevel": "none", "matchedWords": []}, "postcode": [{"value": "<em>8407</em>", "matchLevel": "full", "matchedWords": ["8407"], "fullyHighlighted": true}], "locale_names": [{"value": "Okshatinë", "matchLevel": "none", "matchedWords": []}, {"value": "Shupenzë", "matchLevel": "none", "matchedWords": []}, {"value": "Boçovë", "matchLevel": "none", "matchedWords": []}], "administrative": [{"value": "Shqipëria veriore", "matchLevel": "none", "matchedWords": []}]}}], "query": "8407", "nbHits": 5, "params": "hitsPerPage=5&language=es&type=city&aroundLatLngViaIP=false&query=8407", "degradedQuery": false, "processingTimeMS": 3}, "countryCode": "ar", "administrative": "Neuquén"}`,
                            email:"titiloxx"
                         }
                     ]
                     CargarReserva({...nuevaReserva,customersList},customersList)
                    });
                  }}
                />
            </div>
        );
    }


export default Scheduler;
