import gql from "graphql-tag";

// Get Newsfeed Comments
export const GET_NEWSFEED_COMMENTS = gql`
  query {
  feedComments {
    id
    body
    feed {
      id
    }
    postedBy
    createdAt
    updatedAt
  }
}
`

// Create a Newsfeed Comment
export const CREATE_NEWSFEED_COMMENT = gql`
  mutation createFeedComment($body: String!, $postedBy: String!, $feedID: ID!) {
    createFeedComment(
      data:{
        body: $body
        postedBy: {
        connect: {
          email: $postedBy
        }
      }
      feed: {
        connect: {
          id: $feedID
        }}
    }) {
      id
      body
      feed {
        id
      }
      postedBy {
        id
        email
      }
      createdAt
    }
  }
`

// Update Newsfeed Comment
export const UPDATE_NEWSFEED_COMMENT = gql `
  mutation updateFeedComent($body: String!, $commentID: ID!) {
      updateFeedComment(data: {
        body: $body
      } where: {
        id: $commentID
      }) {
        id
        body
        feed {
          id
        }
        postedBy {
          id
          email
        }
        updatedAt
      }
    }
`

// Delete Newsfeed Comment
export const DELETE_COMMENT = gql `
  mutation deleteFeedComment($id: ID!) {
    deleteFeedComment(where: {
      id: $id
    }) {
      id
    }
  }
`

// Newsfeed Comment Subscription
export const NEWSFEED_COMMENT_SUBSCRIPTION = gql `
  subscription {
  feedComment {
    mutation
    node {
      id
      body
      feed {
        id
      }
      postedBy {
        id
        email
      }
      createdAt
      updatedAt
    }
  }
}
}
`