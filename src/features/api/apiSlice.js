import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  tagTypes: ["Videos", "Video", "RelatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        if (id) {
          let queryString = `/videos?id_ne=${id}&title_like=`;
          queryString += title.split(" ").join("&title_like=")
            .split("&title_like=|").join("")
            .split("&title_like=-").join("") + "&_limit=3";
          return queryString;
        };
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        // console.log(arg);
        return [
          "Videos",
          { type: "Video", id: arg.id },
          { type: "RelatedVideos", id: arg.id },
        ]
      }
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
} = apiSlice;