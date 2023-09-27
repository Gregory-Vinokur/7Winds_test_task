import { rowsSlice } from "./rowSlice";

export const { createEmptyRow, resetClientSideRows } = rowsSlice.actions;

export default rowsSlice.reducer;