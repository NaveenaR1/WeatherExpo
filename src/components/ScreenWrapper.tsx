import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import GradientBackground from './GradientBackground';

interface ScreenWrapperProps {
    children: React.ReactNode;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
    return (
        <GradientBackground>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                {children}
            </SafeAreaView>
        </GradientBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});