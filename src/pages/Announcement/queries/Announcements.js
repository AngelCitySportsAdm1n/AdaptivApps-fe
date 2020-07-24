import gql from "graphql-tag";

// Get Announcement Recipients
export const GET_RECIPIENTS = gql`
  query getRecipients {
    profiles {
      id
      firstName
      lastName
      email
    }
  }
`;

// Create an announcement
export const CREATE_ANNOUNCEMENT = gql`
  mutation createAnnouncement(
    $message: String!
    $recipients: [ProfileWhereUniqueInput!]
    $isAnnouncementRoom: Boolean!
  ) {
    createAnnouncement(
      data: {
        message: $message
        isAnnouncementRoom: $isAnnouncementRoom
        participants: { connect: $recipients }
      }
    ) {
      id
      message

      createdAt
      isAnnouncementRoom
    }
  }
`;

// Retrieve announcements
export const GET_ANNOUNCEMENTS = gql`
  query getAnnouncements($isAnnouncementRoom: Boolean!) {
    announcements(where: { isAnnouncementRoom: $isAnnouncementRoom }) {
      id
      message
      createdAt
      isAnnouncementRoom
    }
  }
`;

// Update an announcement
export const UPDATE_ANNOUNCEMENT = gql`
  mutation updateAnnouncement($id: ID!, $message: String!) {
    updateAnnouncement(
      where: { id: $id }
      data: { message: $message }
    ) {
      id
      message
      createdAt
    }
  }
`;

// Delete an announcement
export const DELETE_ANNOUNCEMENT = gql`
  mutation deleteAnnouncement($id: ID!) {
    deleteAnnouncement(where: { id: $id }) {
      id
    }
  }
`;

// Announcement subscription
export const ANNOUNCEMENT_SUBSCRIPTION = gql`
  subscription announcementSubscription {
    announcement {
      mutation
      node {
        id
        message
        createdAt
        participants {
          email
          id
          firstName
          lastName
        }
        isAnnouncementRoom
      }
    }
  }
`;
