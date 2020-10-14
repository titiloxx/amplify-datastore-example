import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Reserva {
  readonly id: string;
  readonly children?: number;
  readonly guests: string;
  readonly checkoutEstimated: string;
  readonly checkoutMade?: string;
  readonly checkinEstimated: string;
  readonly checkinMade?: string;
  readonly created?: string;
  readonly description?: string;
  readonly resource?: string;
  constructor(init: ModelInit<Reserva>);
  static copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
}