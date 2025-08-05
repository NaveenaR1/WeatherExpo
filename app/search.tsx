import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../src/store';
import { searchWeather, clearSearchData } from '../src/store/slices/weatherSlice';
import { addSearch } from '../src/store/slices/searchSlice';
import { addFavorite, removeFavorite } from '../src/store/slices/favoritesSlice';
import WeatherInfo from '../src/components/WeatherInfo';
import { useNavigation } from 'expo-router';
import ScreenWrapper from '../src/components/ScreenWrapper';
import SearchHeader from '../src/components/SearchHeader';
import { TemperatureUnit } from '../src/utilities/temperatureUnit';
import { Spacing } from '../src/utilities/theme';

export default function SearchScreen() {
    const [cityName, setCityName] = useState('');
    const [unit, setUnit] = useState<TemperatureUnit>(TemperatureUnit.CELSIUS);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { searchData, loading } = useSelector((state: RootState) => state.weather);
    const favoritesList = useSelector((state: RootState) => state.favorites.list);

    useEffect(() => {
        dispatch(clearSearchData());
    }, []);

    const handleSearchCity = async () => {
        if (cityName.trim().length > 0) {
            await dispatch<any>(searchWeather({ query: cityName }));
            dispatch(addSearch(cityName));
        }
    };

    const isFavorite =
        searchData && searchData.location
            ? favoritesList.includes(searchData.location.name)
            : false;

    const toggleFavorite = () => {
        if (searchData) {
            if (isFavorite) {
                dispatch(removeFavorite(searchData.location.name));
            } else {
                dispatch(addFavorite(searchData.location.name));
            }
        }
    };

    return (
        <ScreenWrapper>
            <SearchHeader
                onChange={setCityName}
                onSearch={handleSearchCity}
                onBack={() => (navigation as any).goBack()}
            />

            <View style={styles.resultContainer}>
                {searchData && (
                    <WeatherInfo
                        weatherData={searchData}
                        loading={loading}
                        isFavorite={isFavorite}
                        onToggleFavorite={toggleFavorite}
                        unit={unit}
                        onUnitChange={setUnit}
                    />
                )}
            </View>

        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.medium,
    },
});
