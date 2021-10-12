import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const l18nSlice = createSlice({
  name: 'l18n',
  initialState: { locale: 'en' },
  reducers: {
    setLocale: (_, { payload }: PayloadAction<string>) => ({
      locale: payload,
    }),
  },
});

export const l18nActions = l18nSlice.actions;

export const l18nReducer = l18nSlice.reducer;
