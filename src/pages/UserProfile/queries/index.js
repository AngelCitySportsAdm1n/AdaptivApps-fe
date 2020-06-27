import gql from "graphql-tag";

export const GET_USER_PROFILE = gql`
  query getUserProfile($userName: String!) {
    profile(where: { userName: $userName }) {
      id
      type
      private
      firstName
      lastName
      email
      userName
      profilePicture
      profileBanner
      bio
      city
      state
      extProfile {
        id
        private
        website
        orgName
        gender
      }
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query getUserProfile($email: String!) {
    profile(where: { email: $email }) {
      id
      userName
    }
  }
`;

export const GET_PROFILE_IMAGES = gql`
  query GetProfileImages($userName: String!) {
    profile(where: { userName: $userName }) {
      id
      email
      userName
      profilePicture
      profileBanner
    }
  }
`;

export const UPDATE_PROFILE_PICTURE = gql`
  mutation UpdateProfile($userName: String!, $profilePicture: String!) {
    updateProfile(
      where: { userName: $userName }
      data: { profilePicture: $profilePicture }
    ) {
      id
      email
      profilePicture
    }
  }
`;

export const UPDATE_PROFILE_BANNER = gql`
  mutation UpdateProfile($userName: String, $profileBanner: String) {
    updateProfile(
      where: { userName: $userName }
      data: { profileBanner: $profileBanner }
    ) {
      id
      email
      profileBanner
    }
  }
`;

export const GET_UPCOMING_EVENTS = gql`
  query getUpcomingEvents($userName: String!) {
    events(
      where: { attendees_some: { eventProfile: { userName: $userName } } }
      orderBy: startDate_ASC
    ) {
      id
      title
      startDate
      endDate
      location
      imgUrl
    }
  }
`;

export const UPDATE_FACEBOOK_HANDLE = gql`
  mutation updateFacebookHandle($email: String!, $facebook: String) {
    updateProfile(where: { email: $email } data: { facebook: $facebook }) {
      id
      facebook
    }
  }
`;

export const UPDATE_TWITTER_HANDLE = gql`
  mutation updateTwitterHandle($email: String!, $twitter: String) {
    updateProfile(where: { email: $email } data: { twitter: $twitter }) {
      id
      twitter
    }
  }
`;

export const UPDATE_INSTAGRAM_HANDLE = gql`
  mutation updateInstagramHandle($email: String!, $instagram: String) {
    updateProfile(where: { email: $email } data: { instagram: $instagram }) {
      id
      instagram
    }
  }
`;
