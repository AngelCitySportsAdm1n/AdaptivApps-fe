import gql from "graphql-tag";

// Send a chat
export const SEND_CHAT = gql`
  mutation sendChat($id: ID!, $email: String!, $message: String!) {
    createChat(
      data: {
        from: { connect: { email: $email } }
        message: $message
        room: { connect: { id: $id } }
      }
    ) {
      id
      from {
        id
        firstName
        lastName
        extProfile {
          orgName
        }
      }
      message
      createdAt
      room {
        id
      }
    }
  }
`;

// Update a sent chat
export const UPDATE_CHAT = gql`
  mutation updateChat($id: ID!, $message: String!) {
    updateChat(where: { id: $id }, data: { message: $message }) {
      id
      message
      createdAt
      room {
        id
      }
      from {
        firstName
        lastName
        id
        email
        extProfile {
          orgName
        }
      }
    }
  }
`;

// Delete a chat
export const DELETE_CHAT = gql`
  mutation deleteChat($id: ID!) {
    deleteChat(where: { id: $id }) {
      id
    }
  }
`;

// Retrieve a list of recipients
export const GET_RECIPIENTS = gql`
  query getRecipients {
    profiles {
      id
      firstName
      lastName
      email
      userName
      extProfile {
        orgName
      }
    }
  }
`;

// Chat subscription
export const CHAT_SUBSCRIPTION = gql`
  subscription chatSubscription {
    chat {
      mutation
      node {
        id
        message
        createdAt
        room {
          id
        }
        from {
          firstName
          lastName
          id
          email
          extProfile {
            orgName
          }
        }
      }
    }
  }
`;

// Stop displaying a specific chatroom
export const SHOW_CHATROOM_SENDER = gql`
  mutation showChatroomSender($id: ID!) {
    updateChatRoom(where: { id: $id }, data: { displayForSender: true }) {
      id
    }
  }
`;

export const SHOW_CHATROOM_RECEIVER = gql`
  mutation showChatroomReceiver($id: ID!) {
    updateChatRoom(where: { id: $id }, data: { displayForReceiver: true }) {
      id
    }
  }
`;

export const SHOW_CHATROOM_All = gql`
  mutation showChatroomAll($id: ID!) {
    updateChatRoom(
      where: { id: $id }
      data: { displayForReceiver: true, displayForSender: true }
    ) {
      id
    }
  }
`;
