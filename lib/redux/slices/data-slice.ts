import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

// Generic data item interface
interface DataItem {
  id: string
  title: string
  description?: string
  created_at: string
  updated_at: string
  user_id: string
}

interface DataState {
  items: DataItem[]
  currentItem: DataItem | null
  isLoading: boolean
  error: string | null
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
  filters: {
    search: string
    sortBy: "created_at" | "updated_at" | "title"
    sortOrder: "asc" | "desc"
  }
}

const initialState: DataState = {
  items: [],
  currentItem: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: false,
  },
  filters: {
    search: "",
    sortBy: "created_at",
    sortOrder: "desc",
  },
}

// Async thunks for data operations
export const fetchItems = createAsyncThunk("data/fetchItems", async (params: { page?: number; search?: string }) => {
  // This would typically make an API call to Supabase
  // For now, return mock data
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    items: [],
    total: 0,
    hasMore: false,
  }
})

export const createItem = createAsyncThunk(
  "data/createItem",
  async (item: Omit<DataItem, "id" | "created_at" | "updated_at">) => {
    // This would typically make an API call to Supabase
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      ...item,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as DataItem
  },
)

export const updateItem = createAsyncThunk(
  "data/updateItem",
  async ({ id, updates }: { id: string; updates: Partial<DataItem> }) => {
    // This would typically make an API call to Supabase
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      id,
      updates: {
        ...updates,
        updated_at: new Date().toISOString(),
      },
    }
  },
)

export const deleteItem = createAsyncThunk("data/deleteItem", async (id: string) => {
  // This would typically make an API call to Supabase
  await new Promise((resolve) => setTimeout(resolve, 500))
  return id
})

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentItem: (state, action: PayloadAction<DataItem | null>) => {
      state.currentItem = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
      state.pagination.page = 1 // Reset to first page when searching
    },
    setSortBy: (state, action: PayloadAction<DataState["filters"]["sortBy"]>) => {
      state.filters.sortBy = action.payload
    },
    setSortOrder: (state, action: PayloadAction<DataState["filters"]["sortOrder"]>) => {
      state.filters.sortOrder = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.pagination.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.items
        state.pagination.total = action.payload.total
        state.pagination.hasMore = action.payload.hasMore
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch items"
      })
      // Create item
      .addCase(createItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.items.unshift(action.payload)
        state.pagination.total += 1
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to create item"
      })
      // Update item
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload.updates }
        }
        if (state.currentItem?.id === action.payload.id) {
          state.currentItem = { ...state.currentItem, ...action.payload.updates }
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to update item"
      })
      // Delete item
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items.filter((item) => item.id !== action.payload)
        state.pagination.total -= 1
        if (state.currentItem?.id === action.payload) {
          state.currentItem = null
        }
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to delete item"
      })
  },
})

export const { setCurrentItem, setSearch, setSortBy, setSortOrder, setPage, clearError, resetFilters } =
  dataSlice.actions
