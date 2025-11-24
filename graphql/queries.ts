import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      author
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      author
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $author: String!) {
    createPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
      author
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;
