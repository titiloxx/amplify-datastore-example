/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncReservations = /* GraphQL */ `
  query SyncReservations(
    $filter: ModelReservationsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReservations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        children
        guests
        state
        way
        checkoutEstimated
        checkoutMade
        checkinEstimated
        checkinMade
        description
        resource
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getReservations = /* GraphQL */ `
  query GetReservations($id: ID!) {
    getReservations(id: $id) {
      id
      children
      guests
      state
      way
      checkoutEstimated
      checkoutMade
      checkinEstimated
      checkinMade
      description
      resource
      customersList {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listReservationss = /* GraphQL */ `
  query ListReservationss(
    $filter: ModelReservationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        children
        guests
        state
        way
        checkoutEstimated
        checkoutMade
        checkinEstimated
        checkinMade
        description
        resource
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCustomers = /* GraphQL */ `
  query SyncCustomers(
    $filter: ModelCustomersFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCustomers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        ReservationsId
        fullName
        birthdate
        phone
        dni
        geo
        email
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCustomers = /* GraphQL */ `
  query GetCustomers($id: ID!) {
    getCustomers(id: $id) {
      id
      ReservationsId
      fullName
      birthdate
      phone
      dni
      geo
      email
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listCustomerss = /* GraphQL */ `
  query ListCustomerss(
    $filter: ModelCustomersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ReservationsId
        fullName
        birthdate
        phone
        dni
        geo
        email
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
