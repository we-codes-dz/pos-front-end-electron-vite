import { StateCreator } from 'zustand'
import { TUser } from '@renderer/types/type-schema'

export interface AuthState {
  user: TUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (tokens: { accessToken: string; refreshToken: string }, user?: TUser) => void
  logout: () => void
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: false,
  isLoading: false,

  login: (tokens: { accessToken: string; refreshToken: string }, user?: TUser) => {
    set({
      user: user, // You need to set the user here if you have user information
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isAuthenticated: true,
      isLoading: false
    })
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
  },

  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false
    })
})
