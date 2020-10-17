import React, {Component} from 'react';
import './App.css';
import Scheduler from "./Components/Calendar/Scheduler";
import awsconfig from './aws-exports'; 
import Amplify from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig)
class App extends Component {
  render() {
    return (
        <Scheduler/>
    );
  }
}

export default withAuthenticator(App);
