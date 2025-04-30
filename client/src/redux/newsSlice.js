import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
  name: 'news',
  initialState: { articles: [] },
  reducers: {
    addNews: (state, action) => {
      state.articles.unshift(action.payload);
    },
    setNews: (state, action) => {
      state.articles = action.payload;
    }
  }
});

export const { addNews, setNews } = newsSlice.actions;
export default newsSlice.reducer;