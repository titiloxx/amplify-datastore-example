import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store'


export default ({ element }) => (
  <Provider store={store}>{element}</Provider>
);