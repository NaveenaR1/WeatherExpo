import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { Colors, FontSizes, ViewConstants, Spacing } from '../utilities/theme';

interface ListScreenHeaderProps {
    title: string;
    onToggleSearch: () => void;
}

export default function ListScreenHeader({ title, onToggleSearch }: ListScreenHeaderProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.topRow}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => (navigation as any).goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>

                <Text style={styles.title}>{title}</Text>

                <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={onToggleSearch}
                >
                    <Ionicons name="search" size={22} color={Colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerWrapper: {
        width: '100%',
        backgroundColor: Colors.lightText,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.small,
        height: ViewConstants.headerHeight,
    },
    backButton: {
        paddingRight: Spacing.xlarge,
        paddingLeft: Spacing.small,
    },
    title: {
        color: Colors.text,
        fontSize: FontSizes.large,
        fontWeight: 'bold',
        flex: 1,
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    searchIcon: {
        paddingHorizontal: Spacing.small,
    },
});
