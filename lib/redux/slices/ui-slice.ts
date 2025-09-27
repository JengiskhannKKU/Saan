import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  theme: "light" | "dark" | "system"
  notifications: Array<{
    id: string
    message: string
    type: "success" | "error" | "warning" | "info"
    timestamp: number
  }>
}

const initialState: UiState = {
  sidebarOpen: true,
  mobileMenuOpen: false,
  theme: "system",
  notifications: [],
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload
    },
    setTheme: (state, action: PayloadAction<"light" | "dark" | "system">) => {
      state.theme = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<UiState["notifications"][0], "id" | "timestamp">>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions
