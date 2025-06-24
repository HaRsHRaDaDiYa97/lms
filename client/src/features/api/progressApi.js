import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const PROGRESS_API = "http://localhost:8000/api/v1/progress/";

const baseQuery = fetchBaseQuery({
  baseUrl: PROGRESS_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "refresh-token",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(
        userLoggedIn({
          user: refreshResult.data.user,
          token: refreshResult.data.token,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLoggedOut());
    }
  }

  return result;
};

export const progressApi = createApi({
  reducerPath: "progressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Progress"],
  endpoints: (builder) => ({
    // ✅ Mark a lecture as completed
    markLectureComplete: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: "complete",
        method: "POST",
        body: { courseId, lectureId },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Progress"],
    }),

    // ✅ Get user progress for a specific course
    getUserProgress: builder.query({
      query: (courseId) => `${courseId}`,
      providesTags: ["Progress"],
    }),
  }),
});

export const {
  useMarkLectureCompleteMutation,
  useGetUserProgressQuery,
} = progressApi;
