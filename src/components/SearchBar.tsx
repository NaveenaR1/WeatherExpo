import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, ViewConstants, Spacing } from '../utilities/theme';

interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
    onSearch: () => void;
    onBack?: () => void;
}

export default function SearchBar({ value, onChange, onSearch, onBack }: SearchBarProps) {
    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
            )}

            <TextInput
                style={styles.input}
                placeholder="Search for city"
                placeholderTextColor={Colors.gray}
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSearch}
                returnKeyType="search"
            />

            {value.length > 0 && (
                <TouchableOpacity onPress={() => onChange('')} style={styles.iconButton}>
                    <Ionicons name="close" size={20} color={Colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.lightText,
        paddingHorizontal: Spacing.small,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        height: ViewConstants.headerHeight,
    },
    iconButton: {
        paddingHorizontal: Spacing.medium,
    },
    input: {
        flex: 1,
        fontSize: FontSizes.medium,
        color: Colors.text,
        paddingVertical: Spacing.small,
    },
});
