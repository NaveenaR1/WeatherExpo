import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontSizes, Colors, Spacing } from '../utilities/theme';

interface ListHeaderProps {
    title: string;
    buttonTitle: string;
    onButtonPress: () => void;
}

export default function ListHeader({ title, buttonTitle, onButtonPress }: ListHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onButtonPress} activeOpacity={0.7}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.medium,
        paddingHorizontal: Spacing.medium,
        marginBottom: Spacing.medium,
    },
    title: {
        fontSize: FontSizes.medium,
        color: Colors.lightText,
        fontWeight: '600',
    },
    buttonText: {
        fontSize: FontSizes.medium,
        fontWeight: 'bold',
        color: Colors.lightText,
    },
});
