import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { Colors, ViewConstants, Spacing } from '../utilities/theme';

export default function HomeScreenHeader() {
    const navigation = useNavigation();
    const router = useRouter();

    return (
        <View style={styles.topBar}>
            <View style={styles.leftSection}>
                <TouchableOpacity
                    onPress={() => (navigation as any).openDrawer()}
                    activeOpacity={0.7}
                    style={styles.menuButton}
                >
                    <Ionicons name="menu" size={28} color={Colors.lightText} />
                </TouchableOpacity>

                <Image
                    source={require('../../assets/AppLogo.png')}
                    style={styles.appLogo}
                    resizeMode="contain"
                />
            </View>

            <TouchableOpacity
                onPress={() => router.push('/search')}
                activeOpacity={0.7}
                style={styles.searchButton}
            >
                <Ionicons name="search" size={26} color={Colors.lightText} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: ViewConstants.headerHeight,
        marginBottom: Spacing.medium,
        paddingTop: Spacing.small,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginRight: Spacing.xlarge,
    },
    appLogo: {
        width: 120,
        height: 40,
    },
    searchButton: {
        marginLeft: 'auto',
    },
});
