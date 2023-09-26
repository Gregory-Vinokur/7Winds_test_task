import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../../interfaces/IResponse';
import { IRow } from '../../interfaces/IRow';
import { createRowItem, deleteRowItem, updateRowItem } from './apiSlice.service';

const env = typeof process !== 'undefined' ? process.env : import.meta.env

export const { VITE_BASE_URL, VITE_EID } = env

const apiBaseUrl = VITE_BASE_URL;
const eID = VITE_EID;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    createRow: builder.mutation<IResponse, IRow>({
      query: (row) => ({
        url: `v1/outlay-rows/entity/${eID}/row/create`,
        method: 'POST',
        body: row,
      }),
      async onQueryStarted({ ...row }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(api.util.updateQueryData('getTreeRows', undefined, (draft) => {
            createRowItem(draft, row.parentId, data)
          }));
        } catch (error) {
          console.error('Произошла ошибка при создании строки:', error);
        }
      },
    }),
    updateRow: builder.mutation<IResponse, { rID: number | undefined; row: IRow }>({
      query: ({ rID, row }) => ({
        url: `v1/outlay-rows/entity/${eID}/row/${rID}/update`,
        method: 'POST',
        body: row,
      }),
      async onQueryStarted({ rID }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(api.util.updateQueryData('getTreeRows', undefined, (draft) => {
            updateRowItem(draft, rID, data)
          }));
        } catch (error) {
          console.error('Произошла ошибка при обновлении строки:', error);
        }
      },
    }),
    removeRow: builder.mutation<IResponse, number>({
      query: (rID) => ({
        url: `v1/outlay-rows/entity/${eID}/row/${rID}/delete`,
        method: 'DELETE',
      }),
      async onQueryStarted(rId, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(api.util.updateQueryData('getTreeRows', undefined, (draft) => {
            deleteRowItem(draft, rId, data)
          }));
        } catch (error) {
          console.error('Произошла ошибка при удалении строки:', error);
        }
      },

    }),
    getTreeRows: builder.query<IRow[], void>({
      query: () => `v1/outlay-rows/entity/${eID}/row/list`,
    }),
  }),
});