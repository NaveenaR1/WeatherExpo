// src/components/EmptyState.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontSizes, Spacing, Colors } from '../utilities/theme';

export default function EmptyState({ message, imageSource }) {
    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: Spacing.medium,
    },
    message: {
        color: Colors.lightText,
        fontSize: FontSizes.medium,
        textAlign: 'center',
    },
});
