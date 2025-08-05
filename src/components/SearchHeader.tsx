import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing, ViewConstants } from '../utilities/theme';

interface SearchHeaderProps {
    onChange: (text: string) => void;
    onSearch: () => void;
    onBack: () => void;
}

export default function SearchHeader({ onChange, onSearch, onBack }: SearchHeaderProps) {
    const [text, setText] = useState('');

    const handleTextChange = (value: string) => {
        setText(value);
        onChange(value);
    };

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Search city"
                placeholderTextColor={Colors.gray}
                value={text}
                onChangeText={handleTextChange}
                onSubmitEditing={onSearch}
                returnKeyType="search"
                autoFocus
            />

            {text.length > 0 && (
                <TouchableOpacity onPress={() => handleTextChange('')} style={styles.iconButton}>
                    <Ionicons name="close" size={20} color={Colors.text} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.lightText,
        borderBottomWidth: 1,
        borderBottomColor: Colors.gray,
        height: ViewConstants.headerHeight,
        paddingHorizontal: Spacing.small,
    },
    iconButton: {
        paddingHorizontal: Spacing.small,
    },
    input: {
        flex: 1,
        fontSize: FontSizes.medium,
        color: Colors.text,
        paddingVertical: Spacing.small,
        marginHorizontal: Spacing.small,
    },
});
