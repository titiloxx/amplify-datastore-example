// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reservations, Customers } = initSchema(schema);

export {
  Reservations,
  Customers
};