import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    recent: string[];
}

const initialState: SearchState = {
    recent: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearch: (state, action: PayloadAction<string>) => {
            const query = action.payload.trim();
            if (!query) return;

            // Avoid duplicate entries (case-insensitive)
            const exists = state.recent.find(
                (item) => item.toLowerCase() === query.toLowerCase()
            );
            if (!exists) {
                state.recent.unshift(query); // Add to start of list
            } else {
                // Move existing search to top
                state.recent = [
                    query,
                    ...state.recent.filter((item) => item.toLowerCase() !== query.toLowerCase()),
                ];
            }
        },
        clearSearch: (state) => {
            state.recent = [];
        },
    },
});

export const { addSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
