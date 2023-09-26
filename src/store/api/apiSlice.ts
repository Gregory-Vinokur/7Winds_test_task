import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse } from '../../interfaces/IResponse';
import { IRow } from '../../interfaces/IRow';

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data && data.current) {
            const newRow = data.current;

            dispatch(api.util.updateQueryData('getTreeRows', undefined, (draft) => {
              if (draft && draft.length === 0) {
                draft.push(newRow);
              } else {
                const lastIndex = draft.length - 1;
                if (lastIndex !== -1) {
                  const lastItem = draft[lastIndex];
                  if (lastItem.child && lastItem.child.length === 0) {
                    lastItem.child.push(newRow);
                  } else {
                    const lastChildItem = lastItem.child[lastItem.child.length - 1];
                    if (lastChildItem.child) {
                      lastChildItem.child.push(newRow);
                    }
                  }
                }
              }
            }));
          }
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data && data.changed && data.changed.length > 0) {
            const updatedRow = data.changed[0];

            dispatch(api.util.updateQueryData('getTreeRows', undefined, (draft) => {
              const index = draft.findIndex((row) => row.id === updatedRow.id);
              if (index !== -1) {
                draft[index] = updatedRow;
              }
            }));
          }
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
          const changedItem = data.changed[0];
          let deletedRowId: number | undefined;
          if (data && data.changed && data.changed.length > 0) {
            deletedRowId = changedItem.id;
          } else {
            deletedRowId = rId;
          }

          const findAndRemove = (draft: IRow[], idToDelete: number | undefined) => {
            for (let i = 0; i < draft.length; i++) {
              const row = draft[i];
              if (row.id === idToDelete) {
                draft.splice(i, 1);
                return true;
              }
              if (row.child && row.child.length > 0) {
                if (findAndRemove(row.child, idToDelete)) {
                  return true;
                }
              }
            }
            return false;
          };

          dispatch(api.util.updateQueryData('getTreeRows', undefined, (draft) => {
            findAndRemove(draft, deletedRowId);
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

export const {
  useCreateRowMutation,
  useUpdateRowMutation,
  useRemoveRowMutation,
  useGetTreeRowsQuery,
} = api;