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
    getAllMyCourses: builder.query({
      query: () => '/my-courses',
      providesTags: ['Course'],
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: '/all',
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),

    // getCourseById: builder.query({
    //   query: (courseId) => `${courseId}`,
    //   providesTags: ['Course'],
    // }),

    editCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `edit/${courseId}`, // ✅ fixed
        method: 'PUT',
        body: formData, // ✅ FormData will automatically set correct headers
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
    
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET"
      }),
    }),
    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `/${courseId}/lecture`,
        method: 'POST',
        body: { lectureTitle }, // ✅ Matches the model
      }),
    }),
    getCourseLectures: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lectures`,
        method: 'GET',

      }),
      providesTags: (result, error, courseId) => [{ type: 'CourseLectures', id: courseId }],
    }),

    editLecture: builder.mutation({
      query: ({ lectureId, lectureTitle, isPreviewFree, videoFile }) => {
        const formData = new FormData();
        formData.append("lectureTitle", lectureTitle);
        formData.append("isPreviewFree", isPreviewFree);
        if (videoFile) formData.append("video", videoFile);

        return {
          url: `/lecture/${lectureId}`,
          method: "PUT",
          body: formData,
        };
      },
    }),

    getLectureById: builder.query({
      query: (lectureId) => `/lecture/${lectureId}`,
    }),

    deleteLecture: builder.mutation({
      query: ({ lectureId }) => ({
        url: `/lecture/${lectureId}`, // Make sure lectureId is defined
        method: "DELETE",
      }),
      async onQueryStarted({ lectureId, courseId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            courseApi.util.invalidateTags([{ type: 'CourseLectures', id: courseId }])
          );
        } catch (err) {
          console.error("Delete failed. Refetch skipped.");
        }
      },
    }),


    // courseApi.js
    publishCourse: builder.mutation({
      query: ({ courseId, publish }) => ({
        url: `/${courseId}?publish=${publish}`,
        method: 'PUT',
      }),
    }),


  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useEditCourseMutation,
  useDeleteCourseMutation,
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useDeleteLectureMutation,
  usePublishCourseMutation,
  useGetAllMyCoursesQuery,

} = courseApi;
