import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes } from '../../src/utilities/theme';

export default function DrawerLayout() {
    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: Colors.text,
                drawerLabelStyle: { fontSize: FontSizes.medium },
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="heart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="recentSearch"
                options={{
                    title: 'Recent Searches',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="time-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}
