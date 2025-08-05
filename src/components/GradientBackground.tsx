import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../utilities/theme';

interface GradientBackgroundProps {
    children: ReactNode;
}

export default function GradientBackground({ children }: GradientBackgroundProps) {
    return (
        <LinearGradient
            colors={[Colors.gradientColor1, Colors.gradientColor2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientContainer}
        >
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
});
