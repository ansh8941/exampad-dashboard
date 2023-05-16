import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { PostResponse, CreatePostRequest } from "./types";
import { getAuthToken } from "@/utils/token";

import { setPosts } from "./slice";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string;

export const api = createApi({
  reducerPath: "blogApi",
  baseQuery: graphqlRequestBaseQuery({
    url: `${BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const authToken = getAuthToken();
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
    customErrors: ({ name, response }) => {
      return {
        name,
        message: response?.errors?.[0]?.extensions?.errorMessage || response?.errors?.[0]?.message,
      };
    },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostResponse, void>({
      query: () => ({
        document: gql`
          query Posts {
            posts {
              title
              content
            }
          }
        `,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPosts(data));
        } catch (error) {}
      },
    }),
    createPost: builder.mutation<PostResponse, CreatePostRequest>({
      query: (post) => ({
        document: gql`
          mutation CreatePost($input: CreatePostInput!) {
            createPost(data: $input) {
              title
            }
          }
        `,
        variables: {
          input: post,
        },
      }),
    }),
  }),
});

export const { useCreatePostMutation, useLazyGetAllPostsQuery } = api;
export default api;
