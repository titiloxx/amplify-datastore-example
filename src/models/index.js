// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reserva } = initSchema(schema);

export {
  Reserva
};