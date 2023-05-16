import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { ProfileResponse, ProfileRequest } from "./types";
import { getAuthToken } from "@/utils/token";

import { authProfileSuccess } from "./slice";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string;

export const api = createApi({
  reducerPath: "profileApi",
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
    getUserProfile: builder.query<ProfileResponse, ProfileRequest>({
      query: ({ email, id }) => ({
        document: gql`
          query Profile($input: UserWhereUniqueInput!) {
            profile(where: $input) {
              bio
              firstName
              lastName
            }
          }
        `,
        variables: {
          input: {
            email,
            id,
          },
        },
      }),

      transformResponse: (result: any) => {
        return result;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    getAuthProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        document: gql`
          query ProfileCurrentUser {
            profileCurrentUser {
              bio
              firstName
              lastName
              username
              user {
                email
              }
            }
          }
        `,
      }),

      transformResponse: (result: any) => {
        return result;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authProfileSuccess(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetAuthProfileQuery } = api;
export default api;
