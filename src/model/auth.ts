import { create, type StateCreator } from 'zustand';

import { axios } from '@/query';
import type { AuthActions, AuthParams, AuthResponse, AuthState } from './storeTypes';
import type { AxiosResponse } from 'axios';
import { persist } from 'zustand/middleware';

const authSlice:StateCreator<
  AuthState & AuthActions, 
  [["zustand/persist", unknown]]
> = (set) => ({
  // State
  accessToken: null,
  refreshToken: null,
  isAuthorizated: false,
  rememberMe: false,
  isLoading: false,
  error: null,

  logout: () => {
    set({
      isAuthorizated: false, 
      accessToken: null, 
      refreshToken: null,
    });
  },

  // Action to fetch data
  authUser: async (params: AuthParams) => {
    set({ isLoading: true, error: null, rememberMe: params.rememberMe }); // Set loading to true and clear previous errors

    try {
      const response = await axios.post<AuthParams, AxiosResponse<AuthResponse>>('https://dummyjson.com/auth/login', {
        username: params.userName,
        password: params.password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      set({ 
        isLoading: false,
        isAuthorizated: true, 
        accessToken: response.data.accessToken, 
        refreshToken: response.data.refreshToken,
      });
    } catch (err) {
      set({ 
        error: err?.response?.data?.message || err?.message,
        isLoading: false,
      });
    }
  },
})

export const useAuthStore = create<AuthState & AuthActions>()(
  persist((...args) => ({ ...authSlice(...args) }), {
    name: "authStore",
    partialize: (state) => ({ 
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      isAuthorizated: state.isAuthorizated,
      rememberMe: state.rememberMe,
    }),
  })
);

export const authUser = (params: AuthParams) =>
  useAuthStore.getState().authUser(params);

export const authLogout = () =>
  useAuthStore.getState().logout();
