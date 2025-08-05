import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store, persistor } from '../src/store';
import { StatusBar } from 'react-native';
import GradientBackground from '../src/components/GradientBackground';

export default function Layout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                    <GradientBackground>
                        <Stack screenOptions={{ headerShown: false }} />
                    </GradientBackground>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
