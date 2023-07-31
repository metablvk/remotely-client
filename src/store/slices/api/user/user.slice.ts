import {apiSlice} from '../api.slice';
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useRegisterMutation} = usersApiSlice;
