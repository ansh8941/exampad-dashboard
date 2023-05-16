import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { LoginRequest, LoginResponse } from "./types";

import { loginSuccess } from "./slice";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT as string;

export const api = createApi({
  reducerPath: "authApi",
  baseQuery: graphqlRequestBaseQuery({
    url: `${BASE_URL}`,
    customErrors: ({ name, response }) => {
      return {
        name,
        message: response?.errors?.[0]?.extensions?.errorMessage || response?.errors?.[0]?.message,
      };
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        document: gql`
          mutation Login($input: LoginUserInput!) {
            login(data: $input) {
              accessToken
            }
          }
        `,
        variables: {
          input: {
            email,
            password,
          },
        },
      }),

      transformResponse: (result: { login: LoginResponse }) => {
        return result.login;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = api;
export default api;
