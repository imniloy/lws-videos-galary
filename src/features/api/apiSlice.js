import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 50,
    }),

    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
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
      }
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      })
    })
  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation } = apiSlice;