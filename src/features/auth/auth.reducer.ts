import { User } from '@models/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoading: false, user: undefined as User | undefined },
  reducers: {
    setIsLoading: state => {
      state.isLoading = true;
    },
    setLoggedUser: (state, { payload }: PayloadAction<User | undefined>) => {
      state.isLoading = false;
      state.user = payload;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
