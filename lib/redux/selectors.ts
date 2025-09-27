import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "./store"

// Auth selectors
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
export const selectAuthError = (state: RootState) => state.auth.error

// UI selectors
export const selectUI = (state: RootState) => state.ui
export const selectSidebarOpen = (state: RootState) => state.ui.sidebarOpen
export const selectMobileMenuOpen = (state: RootState) => state.ui.mobileMenuOpen
export const selectTheme = (state: RootState) => state.ui.theme
export const selectNotifications = (state: RootState) => state.ui.notifications

// Data selectors
export const selectData = (state: RootState) => state.data
export const selectDataItems = (state: RootState) => state.data.items
export const selectCurrentItem = (state: RootState) => state.data.currentItem
export const selectDataLoading = (state: RootState) => state.data.isLoading
export const selectDataError = (state: RootState) => state.data.error
export const selectDataPagination = (state: RootState) => state.data.pagination
export const selectDataFilters = (state: RootState) => state.data.filters

// Memoized selectors
export const selectFilteredItems = createSelector([selectDataItems, selectDataFilters], (items, filters) => {
  let filtered = items

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filtered = filtered.filter(
      (item) => item.title.toLowerCase().includes(searchLower) || item.description?.toLowerCase().includes(searchLower),
    )
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const aValue = a[filters.sortBy]
    const bValue = b[filters.sortBy]

    if (filters.sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return filtered
})

export const selectUnreadNotifications = createSelector([selectNotifications], (notifications) =>
  notifications.filter((notification) => Date.now() - notification.timestamp < 5000),
)
