import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cloudinaryApi = createApi({
  reducerPath: 'cloudinaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.cloudinary.com/v1_1/dqmxjwhrm/image/upload',
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ url: string }, File>({
      query: (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'alpha-telecom-tariff-images');
        formData.append('public_id', image.name);

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = cloudinaryApi;
