import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppConstants } from '../../utilities/AppConstants';

interface WeatherData {
    location: { name: string; country: string };
    current: { temp_c: number; temp_f: number; condition: { text: string; icon: string } };
    forecast: { forecastday: { day: { mintemp_c: number; maxtemp_c: number; daily_chance_of_rain: number } }[] };
}

interface WeatherState {
    data: WeatherData | null;        //   Home (current location)
    searchData: WeatherData | null;  //   Search results
    cache: { [key: string]: WeatherData };
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    searchData: null,
    cache: {},
    loading: false,
    error: null,
};

const fetchWeather = async (query: string) => {
    const response = await axios.get(
        `${AppConstants.API_BASE_URL}/forecast.json?key=${AppConstants.API_KEY}&q=${query}&days=1&aqi=no&alerts=no`
    );
    return response.data;
};

//   Thunk for home weather (location-based)
export const getWeather = createAsyncThunk('weather/getWeather', async ({ query }: { query: string }) => {
    return await fetchWeather(query);
});

//   Thunk for search weather (manual search)
export const searchWeather = createAsyncThunk('weather/searchWeather', async ({ query }: { query: string }) => {
    return await fetchWeather(query);
});

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clearSearchData: (state) => {
            state.searchData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //   Home weather only updates data
            .addCase(getWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
                state.data = action.payload;
                if (action.payload.location?.name) {
                    state.cache[action.payload.location.name] = action.payload;
                }
                state.loading = false;
            })
            .addCase(getWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather data';
            })

            //   Search weather only updates searchData
            .addCase(searchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
                state.searchData = action.payload;
                if (action.payload.location?.name) {
                    state.cache[action.payload.location.name] = action.payload;
                }
                state.loading = false;
            })
            .addCase(searchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather data';
            });
    },
});

export const { clearSearchData } = weatherSlice.actions;
export default weatherSlice.reducer;
