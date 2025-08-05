import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { RootState } from '../../src/store';
import { getWeather } from '../../src/store/slices/weatherSlice';
import { addFavorite, removeFavorite } from '../../src/store/slices/favoritesSlice';
import { Colors, FontSizes, Spacing } from '../../src/utilities/theme';
import dayjs from 'dayjs';
import WeatherInfo from '../../src/components/WeatherInfo';
import { TemperatureUnit } from '../../src/utilities/temperatureUnit';
import ScreenWrapper from '../../src/components/ScreenWrapper';
import HomeScreenHeader from '../../src/components/HomeScreenHeader';

export default function Home() {
    const [currentTime, setCurrentTime] = useState(dayjs().format('h:mm A'));
    const [loading, setLoading] = useState(true);
    const [unit, setUnit] = useState<TemperatureUnit>(TemperatureUnit.CELSIUS);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const router = useRouter();

    const weatherData = useSelector((state: RootState) => state.weather.data);
    const favorites = useSelector((state: RootState) => state.favorites.list);

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs().format('h:mm A'));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Get current location and fetch weather
    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Allow location access to show local weather');
                    setLoading(false);
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                const coords = `${location.coords.latitude},${location.coords.longitude}`;
                setLoading(true);
                await dispatch<any>(getWeather({ query: coords }));
            } catch (error) {
                Alert.alert('Error', 'Unable to fetch location or weather data');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const isFavorite =
        weatherData && favorites.includes(weatherData.location?.name || '');

    const handleToggleFavorite = () => {
        const cityName = weatherData?.location?.name;
        if (!cityName) return;

        if (favorites.includes(cityName)) {
            dispatch(removeFavorite(cityName));
        } else {
            dispatch(addFavorite(cityName));
        }
    };

    return (
        <ScreenWrapper>
            <View style={styles.viewContainer}>
                <HomeScreenHeader />

                {loading && !weatherData ? (
                    <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
                ) : (
                    <WeatherInfo
                        weatherData={weatherData}
                        loading={loading}
                        isFavorite={isFavorite}
                        onToggleFavorite={handleToggleFavorite}
                        unit={unit}
                        onUnitChange={setUnit}
                    />
                )}
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        paddingHorizontal: Spacing.medium,
    },
});
