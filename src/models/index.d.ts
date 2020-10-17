import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Reservations {
  readonly id: string;
  readonly children?: number;
  readonly guests: string;
  readonly state: string;
  readonly way: string;
  readonly checkoutEstimated: number;
  readonly checkoutMade?: number;
  readonly checkinEstimated: number;
  readonly checkinMade?: number;
  readonly description?: string;
  readonly resource?: string;
  readonly customersList?: Customers[];
  constructor(init: ModelInit<Reservations>);
  static copyOf(source: Reservations, mutator: (draft: MutableModel<Reservations>) => MutableModel<Reservations> | void): Reservations;
}

export declare class Customers {
  readonly id: string;
  readonly ReservationsId: string;
  readonly fullName: string;
  readonly birthdate?: number;
  readonly phone?: string;
  readonly dni?: string;
  readonly geo?: string;
  readonly email?: string;
  constructor(init: ModelInit<Customers>);
  static copyOf(source: Customers, mutator: (draft: MutableModel<Customers>) => MutableModel<Customers> | void): Customers;
}