/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReservations = /* GraphQL */ `
  subscription OnCreateReservations {
    onCreateReservations {
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
export const onUpdateReservations = /* GraphQL */ `
  subscription OnUpdateReservations {
    onUpdateReservations {
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
export const onDeleteReservations = /* GraphQL */ `
  subscription OnDeleteReservations {
    onDeleteReservations {
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
export const onCreateCustomers = /* GraphQL */ `
  subscription OnCreateCustomers {
    onCreateCustomers {
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
export const onUpdateCustomers = /* GraphQL */ `
  subscription OnUpdateCustomers {
    onUpdateCustomers {
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
export const onDeleteCustomers = /* GraphQL */ `
  subscription OnDeleteCustomers {
    onDeleteCustomers {
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
