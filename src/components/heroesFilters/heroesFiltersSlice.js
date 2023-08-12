import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';



const filtersAdapter = createEntityAdapter();

// const initialState = filtersAdapter.getInitialState({
//     filtersLoadingStatus: 'idle',
//     activeFilter: "all"
// });

// console.log(initialState);

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
)


const heroesFiltersSlice = createSlice({
    name: "filters",
    initialState: filtersAdapter.getInitialState({
        filtersLoadingStatus: 'idle',
        activeFilter: "all"
    }),
    reducers: {
        heroesFiltered: (state, action) => {filtersAdapter.removeAll(state, action.payload)},
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = "loading"})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = "error"})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = heroesFiltersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    heroesFiltered,
    activeFilterChanged
} = actions;
