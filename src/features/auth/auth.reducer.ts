import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@models/User';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoading: false, user: undefined as User | undefined },
  reducers: {
    setIsLoading: state => {
      state.isLoading = true;
    },
    setLoggedUser: (_, { payload }: PayloadAction<User | undefined>) => ({
      isLoading: false,
      user: payload,
    }),
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
