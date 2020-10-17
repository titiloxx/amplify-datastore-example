/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReservations = /* GraphQL */ `
  mutation CreateReservations($input: CreateReservationsInput!) {
    createReservations(input: $input) {
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
export const updateReservations = /* GraphQL */ `
  mutation UpdateReservations($input: UpdateReservationsInput!) {
    updateReservations(input: $input) {
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
export const deleteReservations = /* GraphQL */ `
  mutation DeleteReservations($input: DeleteReservationsInput!) {
    deleteReservations(input: $input) {
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
export const createCustomers = /* GraphQL */ `
  mutation CreateCustomers($input: CreateCustomersInput!) {
    createCustomers(input: $input) {
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
export const updateCustomers = /* GraphQL */ `
  mutation UpdateCustomers($input: UpdateCustomersInput!) {
    updateCustomers(input: $input) {
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
export const deleteCustomers = /* GraphQL */ `
  mutation DeleteCustomers($input: DeleteCustomersInput!) {
    deleteCustomers(input: $input) {
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
