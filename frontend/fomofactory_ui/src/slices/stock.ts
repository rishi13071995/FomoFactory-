import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"

export interface StockState {
  loading: boolean;
  stocks: Array<any>;
  error: string | undefined;
}
const initialState: StockState = {
  loading: false,
  stocks: [],
  error: undefined,
}
export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async () => {
    const apiUrl = 'http://localhost:3000';
    const apiKey = 'p3mCtLUwCx';
    try {
      const response = await fetch(`${apiUrl}/api/v1/stocks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'api_key': apiKey
        },
      });


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  }
)
const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStocks.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchStocks.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = undefined;
      state.stocks = action.payload.stocks;
    });
    builder.addCase(fetchStocks.rejected, (state, action) => {
      state.loading = false;
      state.stocks = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const stockSelector = (state: RootState) => state.stockReducer;
export default stockSlice.reducer;