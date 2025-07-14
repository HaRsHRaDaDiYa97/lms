import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8000/api/v1/user/";

// ✅ Simple baseQuery with token injection
const baseQuery = fetchBaseQuery({
  baseUrl: USER_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    console.log("🟡 TOKEN in prepareHeaders:", token); // 👈 LOG THIS

    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery, // ✅ No baseQueryWithAuthHandling
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
            console.log("✅ Login response:", result.data); // 👈 Add this
          dispatch(
            userLoggedIn({
              user: result.data.user,
              token: result.data.token,
            })
          );
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    loadUser: builder.query({
      query: () => "profile",
      providesTags: ["User"],
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error("Load user error:", error);
          if (error?.error?.status === 401) {
            dispatch(userLoggedOut()); // ✅ Handle logout here only
          }
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
      invalidatesTags: ["User"],
    }),

    getEnrolledCourses: builder.query({
      query: () => ({
        url: "enrolled-courses",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
  useGetEnrolledCoursesQuery,
} = authApi;
