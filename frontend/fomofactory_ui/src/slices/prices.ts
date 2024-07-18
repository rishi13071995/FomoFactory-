import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"


export interface StockState {
  loading: boolean;
  stocksprices: Array<any>;
  error: string | undefined;
}
const initialState: StockState = {
  loading: false,
  stocksprices: [],
  error: undefined,
}
export const fetchStocksPrices = createAsyncThunk(
  "stocks/fetchStockPrices",
  async (stock: any) => {
    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;
    try {
      const response = await fetch(`${apiUrl}/api/v1/stocksprice?stock=${stock}`, {
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
const stockPriceSlice = createSlice({
  name: 'stockPrices',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchStocksPrices.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchStocksPrices.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = undefined;
      state.stocksprices = action.payload.stocksprice;
    });
    builder.addCase(fetchStocksPrices.rejected, (state, action) => {
      state.loading = false;
      state.stocksprices = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const stockPriceSelector = (state: RootState) => state.stockPriceReducer;
export default stockPriceSlice.reducer;