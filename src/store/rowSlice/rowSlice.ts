import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRow } from '../../interfaces/IRow';

export const rowsSlice = createSlice({
  name: 'rows',
  initialState: { clientSideRows: [] } as { clientSideRows: IRow[] },
  reducers: {
    createEmptyRow: (state, action: PayloadAction<IRow>) => {
      state.clientSideRows.push(action.payload);
    },
    resetClientSideRows: (state) => {
      state.clientSideRows = [];
    },
  },
});