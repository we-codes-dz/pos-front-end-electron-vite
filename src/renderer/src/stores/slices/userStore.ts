import { TUser } from '@renderer/types/type-schema'
import { StateCreator } from 'zustand'

export interface UserSlice {
  user: TUser | null
  login: (user: TUser) => void
  logout: () => void
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  login: (user: TUser) => set({ user }),
  logout: () => set({ user: null })
})
