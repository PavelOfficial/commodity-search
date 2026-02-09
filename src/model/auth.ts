import { create, type StateCreator } from 'zustand';
import { axios } from '../query';
import type { AuthActions, AuthParams, AuthResponse, AuthState } from './storeTypes';

const authSlice:StateCreator<AuthState & AuthActions> = (set) => ({
  // State
  isAuthorizated: false,
  isLoading: false,
  error: null,

  // Action to fetch data
  authUser: async (params: AuthParams) => {
    console.log(params);

    set({ isLoading: true, error: null }); // Set loading to true and clear previous errors
    try {
      const response = await axios.post<AuthParams, AuthResponse>('https://dummyjson.com/auth/login', {
        username: params.userName,
        password: params.password,
      }, {
        headers: { 'Content-Type': 'application/json' },
        // withCredentials: true,
        // credentials: 'include'
      });

      console.log(response);
      
      localStorage.setItem("accessTocken", response.accessToken);
      localStorage.setItem("refreshTocken", response.refreshToken);
      set({ isAuthorizated: true, isLoading: false }); // On success, store data and set loading to false
    } catch (err) {
      set({ error: err.message, isLoading: false }); // On failure, store error and set loading to false
    }
  },
})

export const useAuthStore = create(authSlice);

export const authUser = (params: AuthParams) =>
  useAuthStore.getState().authUser(params);