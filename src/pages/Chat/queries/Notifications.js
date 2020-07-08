import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
  query getNotifications($email: String!) {
    profile(where: { email: $email }) {
      id
      email
      firstName
      lastName
      extProfile {
        id
        orgName
      }
      notifications {
        id
        label
        chatroom {
          id
        }
      }
    }
  }
`;

export const CREATE_CHAT_NOTIFICATION = gql`
  mutation createChatRoomNotification($email: String!, $id: ID!) {
    createNotification(
      data: {
        profile: { connect: { email: $email } }
        chatroom: { connect: { id: $id } }
      }
    ) {
      id
      chatroom {
        id
      }
      profile {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($id: ID!) {
    deleteNotification(where: { id: $id }) {
      id
    }
  }
`;

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription {
    notification {
      mutation
      node {
        id
        label
        chatroom {
          id
          notifications {
            id
          }
        }
        announcement {
          id
          notification {
            id
          }
        }
        profile {
          id
          email
          firstName
          lastName
          extProfile {
            id
            orgName
          }
        }
      }
    }
  }
`;

export const GET_ALL_NOTIFICATIONS = gql`
  query {
    notifications {
      id
    }
  }
`;

// To delete all notifications for development:
// Use GET_ALL_NOTIFICATIONS query & DELETE_NOTIFIATION mutation with:
// notifications && notifications.notifications.map(item => deleteNotification({variables: {id: item.id}}))
