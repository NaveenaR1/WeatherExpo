import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
    list: string[];
}

const initialState: FavoritesState = { list: [] };

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            if (!state.list.includes(action.payload)) {
                state.list.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((city) => city !== action.payload);
        },
        clearFavorites: (state) => {
            state.list = [];
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
