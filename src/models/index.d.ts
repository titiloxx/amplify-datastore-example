import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Reservations {
  readonly id: string;
  readonly state: string;
  readonly checkoutEstimated: number;
  readonly checkoutMade?: number;
  readonly checkinEstimated: number;
  readonly checkinMade?: number;
  readonly description?: string;
  readonly resource?: string;
  readonly regularCustomer?: string;
  readonly roomsList?: string[];
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

export declare class Services {
  readonly id: string;
  readonly ReservationsId: string;
  readonly name: string;
  readonly cost: number;
  readonly quantity: number;
  readonly description?: string;
  readonly components?: string;
  constructor(init: ModelInit<Services>);
  static copyOf(source: Services, mutator: (draft: MutableModel<Services>) => MutableModel<Services> | void): Services;
}

export declare class Rooms {
  readonly id: string;
  readonly number?: string;
  readonly sector?: string;
  constructor(init: ModelInit<Rooms>);
  static copyOf(source: Rooms, mutator: (draft: MutableModel<Rooms>) => MutableModel<Rooms> | void): Rooms;
}