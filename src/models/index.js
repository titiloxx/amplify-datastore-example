// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reservations, Customers, Services, Rooms } = initSchema(schema);

export {
  Reservations,
  Customers,
  Services,
  Rooms
};