import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

const COURSE_API = 'http://localhost:8000/api/v1/course';

// 🟢 Base query with token header
const baseQuery = fetchBaseQuery({
  baseUrl: COURSE_API,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token;

    headers.set('Accept', 'application/json');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// 🔁 Auto-refresh token logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: '/refresh-token',
        method: 'POST',
        credentials: 'include',
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

// 🔗 Create API
export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Course'],
  endpoints: (builder) => ({
    // Create course
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: '/create',
        method: 'POST',
        body: courseData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Course'],
    }),

    // Get logged-in user's courses
    getAllCourses: builder.query({
      query: () => '/my-courses',
      providesTags: ['Course'],
    }),

    getCourseById: builder.query({
      query: (courseId) => `${courseId}`,
      providesTags: ['Course'],
    }),

    updateCourse: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${id}`,
        method: 'PUT',
        body: updatedData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Course'],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
