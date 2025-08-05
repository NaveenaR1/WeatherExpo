import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../utilities/theme';

interface WeatherCardProps {
    city: string;
    country?: string;
    temperature: string;
    condition: string;
    iconUrl: string;
    isFavorite?: boolean;
    onPress: () => void;
    onToggleFavorite?: () => void;
}

export default React.memo(function WeatherCard({
    city,
    country,
    temperature,
    condition,
    iconUrl,
    isFavorite = false,
    onPress,
    onToggleFavorite,
}: WeatherCardProps) {
    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.85} onPress={onPress}>
            <View style={styles.infoContainer}>
                <Text
                    style={styles.cityText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {city}
                    {country ? `, ${country}` : ''}
                </Text>
                <View style={styles.weatherRow}>
                    {iconUrl ? (
                        <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
                    ) : (
                        <Ionicons name="partly-sunny-outline" size={32} color="#fff" />
                    )}
                    <Text style={styles.temperatureText}>{temperature}</Text>
                    <Text style={styles.unitText}>°C</Text>
                    <Text
                        style={styles.conditionText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {condition}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={onToggleFavorite}
                style={styles.heartIconContainer}
            >
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={28}
                    color={Colors.accent}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.medium,
        paddingHorizontal: Spacing.medium,
        marginVertical: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    infoContainer: {
        flex: 1,
        paddingRight: Spacing.small,
    },
    cityText: {
        color: Colors.accent,
        fontSize: FontSizes.large,
        fontWeight: '700',
        marginBottom: Spacing.small,
    },
    weatherRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    weatherIcon: {
        width: 40,
        height: 40,
        marginRight: Spacing.small,
    },
    temperatureText: {
        color: Colors.lightText,
        fontSize: FontSizes.xlarge,
        fontWeight: '700',
    },
    unitText: {
        color: Colors.lightText,
        fontSize: FontSizes.large,
        fontWeight: '400',
        marginHorizontal: Spacing.small,
    },
    conditionText: {
        flexShrink: 1,
        color: Colors.lightText,
        fontSize: FontSizes.medium,
        fontWeight: '500',
    },
    heartIconContainer: {
        marginLeft: Spacing.small,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
