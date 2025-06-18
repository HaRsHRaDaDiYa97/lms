import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8000/api/v1/user/";

// Create a base query with re-authentication logic
const baseQuery = fetchBaseQuery({
  baseUrl: USER_API,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    
    // Set default headers
    headers.set('Accept', 'application/json');
    
    // Add authorization header if token exists
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // If 401 error, try to refresh token
  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { 
        url: 'refresh-token', // Update this to your actual refresh endpoint
        method: 'POST',
        credentials: 'include'
      },
      api,
      extraOptions
    );
    
    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(userLoggedIn({ 
        user: refreshResult.data.user,
        token: refreshResult.data.token 
      }));
      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed - logout the user
      api.dispatch(userLoggedOut());
    }
  }
  
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // Store both user and token from response
          dispatch(userLoggedIn({ 
            user: result.data.user,
            token: result.data.token 
          }));
        } catch (error) {
          console.log('Login error:', error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => "profile",
      providesTags: ['User'],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log('Load user error:', error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => "logout",
      async onQueryStarted(args, { dispatch }) {
        dispatch(userLoggedOut());
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ['User'],
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
} = authApi;