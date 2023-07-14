const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_DELETED':
            return {
                ...state,
                heroes: state.heroes.filter((item) => item.id !== action.payload)
            }
        case 'HERO_ADDED':
            return {
                ...state,
                heroes: action.payload
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHED':
        return {
            ...state,
            filters: action.payload
        }
        case 'HEROES_FILTERED':
        return {
            ...state,
            heroes: action.payload
        }
        default: return state
    }
}

export default reducer;