import React, {Fragment, useEffect} from 'react';
import './App.css';
import MainCalendar from "./Components/Main/main";
import awsconfig from './aws-exports'; 
import Amplify from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Reservations, Customers} from './models/index'
import { useDispatch } from 'react-redux'
import { DataStore } from '@aws-amplify/datastore';
import Modal from './Components/Modal/modal'

//CSS
import 'semantic-ui-css/semantic.min.css'
import 'react-table-6/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';
Amplify.configure(awsconfig)
const App=()=>
{
  const dispatch=useDispatch();
  useEffect(() => {
    const subscription = DataStore.observe(Reservations).subscribe((msg) => {
        dispatch({type:"RELOAD_RESERVATIONS"});
    });
    dispatch({type:"RELOAD_RESERVATIONS"});
    //dispatch({type:"RELOAD_ROOMS"});
    return () => subscription.unsubscribe();
  }, []);
 
    return (
      <Fragment>
        <Modal/>
        <MainCalendar/>
      </Fragment>

    );
  
}

export default withAuthenticator(App);
