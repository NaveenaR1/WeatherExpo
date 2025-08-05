import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../utilities/theme';
import dayjs from 'dayjs';
import { TemperatureUnit } from '../utilities/temperatureUnit';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface WeatherInfoProps {
    weatherData: any;
    loading: boolean;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    unit: TemperatureUnit;
    onUnitChange: (unit: TemperatureUnit) => void;
}

export default function WeatherInfo({
    weatherData,
    loading,
    isFavorite,
    onToggleFavorite,
    unit,
    onUnitChange,
}: WeatherInfoProps) {
    if (loading) {
        return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />;
    }

    if (!weatherData) {
        return null;
    }

    const tempC = weatherData.current.temp_c.toFixed(0);
    const tempF = weatherData.current.temp_f.toFixed(0);
    const temperature = unit === TemperatureUnit.CELSIUS ? tempC : tempF;

    const minTemp =
        unit === TemperatureUnit.CELSIUS
            ? weatherData.forecast.forecastday[0].day.mintemp_c.toFixed(0)
            : ((weatherData.forecast.forecastday[0].day.mintemp_c * 9) / 5 + 32).toFixed(0);

    const maxTemp =
        unit === TemperatureUnit.CELSIUS
            ? weatherData.forecast.forecastday[0].day.maxtemp_c.toFixed(0)
            : ((weatherData.forecast.forecastday[0].day.maxtemp_c * 9) / 5 + 32).toFixed(0);

    const precipitation = `${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>
                {dayjs().format('ddd, DD MMM YYYY  hh:mm A').toUpperCase()}
            </Text>

            <Text style={styles.locationText}>
                {weatherData.location.name}, {weatherData.location.country}
            </Text>

            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={onToggleFavorite}
                activeOpacity={0.7}
            >
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={28}
                    color="#fff"
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.favoriteText}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>

            <Image
                source={{ uri: `https:${weatherData.current.condition.icon}` }}
                style={styles.weatherIcon}
            />

            <View style={styles.tempContainer}>
                <Text style={styles.temperature}>{temperature}</Text>
                <View style={styles.toggleGroup}>
                    <TouchableOpacity
                        style={[styles.toggleButton, unit === TemperatureUnit.CELSIUS && styles.toggleSelected]}
                        onPress={() => onUnitChange(TemperatureUnit.CELSIUS)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                unit === TemperatureUnit.CELSIUS && styles.toggleTextSelected,
                            ]}
                        >
                            °C
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, unit === TemperatureUnit.FAHRENHEIT && styles.toggleSelected]}
                        onPress={() => onUnitChange(TemperatureUnit.FAHRENHEIT)}
                    >
                        <Text
                            style={[
                                styles.toggleText,
                                unit === TemperatureUnit.FAHRENHEIT && styles.toggleTextSelected,
                            ]}
                        >
                            °F
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.condition}>{weatherData.current.condition.text}</Text>

            <View style={styles.footerWrapper}>
                <View style={styles.footer}>
                    <View style={styles.footerItem}>
                        <Ionicons name="thermometer-outline" size={28} color="#fff" style={styles.footerIcon} />
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerLabel}>Min - Max</Text>
                            <Text style={styles.footerValue}>{minTemp}° - {maxTemp}°</Text>
                        </View>
                    </View>
                    <View style={styles.footerItem}>
                        <Ionicons name="rainy-outline" size={28} color="#fff" style={styles.footerIcon} />
                        <View style={styles.footerTextContainer}>
                            <Text style={styles.footerLabel}>Precipitation</Text>
                            <Text style={styles.footerValue}>{precipitation}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: Spacing.medium,
        paddingHorizontal: Spacing.medium,
    },
    dateText: {
        color: Colors.secondaryText,
        fontSize: FontSizes.medium,
        textAlign: 'center',
        marginBottom: Spacing.medium,
    },
    locationText: {
        color: Colors.lightText,
        fontSize: FontSizes.xlarge,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: Spacing.large,
    },
    weatherIcon: {
        width: 150,
        height: 150,
        marginBottom: Spacing.large,
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.small,
    },
    temperature: {
        color: Colors.lightText,
        fontSize: FontSizes.xxxlarge,
        fontWeight: 'bold',
        marginRight: Spacing.small,
        includeFontPadding: false,
        textAlignVertical: 'bottom',
        lineHeight: FontSizes.xxxlarge,
    },
    toggleGroup: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.lightText,
        borderRadius: 4,
        overflow: 'hidden',
        height: FontSizes.large * 1.8,
        alignSelf: 'flex-end',
        marginBottom: 12,
    },
    toggleButton: {
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    toggleSelected: {
        backgroundColor: Colors.lightText,
    },
    toggleText: {
        color: Colors.lightText,
        fontSize: FontSizes.large,
        fontWeight: '600',
        textAlignVertical: 'center',
        includeFontPadding: false,
        lineHeight: 24,
    },
    toggleTextSelected: {
        color: 'red',
        fontWeight: 'bold',
    },
    condition: {
        color: Colors.lightText,
        fontSize: FontSizes.xlarge,
        textAlign: 'center',
        marginBottom: 15,
        marginTop: 20,
    },
    favoriteButton: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 18,
        alignSelf: 'center',
        marginBottom: Spacing.xlarge,
        alignItems: 'center',
    },
    favoriteText: {
        color: Colors.lightText,
        fontSize: FontSizes.medium,
        fontWeight: 'bold'
    },
    footerWrapper: {
        width: SCREEN_WIDTH,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 'auto',
        paddingVertical: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },
    footerIcon: {
        marginRight: 10,
    },
    footerTextContainer: {
        flexDirection: 'column',
    },
    footerLabel: {
        color: Colors.lightText,
        fontSize: FontSizes.medium,
    },
    footerValue: {
        color: Colors.lightText,
        fontSize: FontSizes.large,
        fontWeight: 'bold',
        marginTop: 2,
    },
});
