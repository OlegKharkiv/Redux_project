import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: "all"
}

export const fetchFilters = createAsyncThunk(
    'heroes/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
)

const heroesFiltersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        heroesFiltered: (state, action) => {state.heroes = action.payload},
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = "loading"})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = "error"})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = heroesFiltersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    heroesFiltered,
    activeFilterChanged
} = actions;