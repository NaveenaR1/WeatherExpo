import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '../src/components/GradientBackground';

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(drawer)/home');
        }, 2500); // 2.5 seconds splash
        return () => clearTimeout(timer);
    }, []);

    return (
        <GradientBackground>
            <View style={styles.splashContainer}>
                <Image
                    source={require('../assets/AppLogo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 200,
        height: 200,
    },
});
