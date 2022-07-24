import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
};

const END_POINT = 'https://hn.algolia.com/api/v1/search?query=';

export const fetchCharactersFromAPI = createAsyncThunk(
  'characters/fetchCharacters',
  async (searchTerm) => {
    const response = await fetch(END_POINT + searchTerm).then((response) =>
      response.json()
    );
    return response.hits;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    add: (state, action) => {
      state.characters = action.payload;
    },
  },
  extraReducers: {
    [fetchCharactersFromAPI.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    [fetchCharactersFromAPI.pending]: (state, action) => {
      state.loading = true;
    }
  },
});
