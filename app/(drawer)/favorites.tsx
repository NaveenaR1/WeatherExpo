import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import { removeFavorite, clearFavorites } from '../../src/store/slices/favoritesSlice';
import WeatherCard from '../../src/components/WeatherCard';
import EmptyState from '../../src/components/EmptyState';
import ListHeader from '../../src/components/ListHeader';
import ListScreenHeader from '../../src/components/ListScreenHeader';
import SearchBar from '../../src/components/SearchBar';
import { filterCitiesBySearchText } from '../../src/utilities/filterHelper';
import ScreenWrapper from '../../src/components/ScreenWrapper';
import { Spacing } from '../../src/utilities/theme';

export default function Favorites() {
    const [searchText, setSearchText] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const favoritesList = useSelector((state: RootState) => state.favorites.list);
    const weatherDataCache = useSelector((state: RootState) => state.weather.cache);
    const dispatch = useDispatch();

    const filteredList = filterCitiesBySearchText(favoritesList, weatherDataCache, searchText);
    const dataCount = filteredList.length;
    const hasData = dataCount > 0;

    const handleRemoveAll = () => {
        Alert.alert(
            '',
            'Are you sure you want to remove all the favourites?',
            [
                {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'YES',
                    onPress: () => dispatch(clearFavorites()),
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <ScreenWrapper>
            <ListScreenHeader
                title="Favorites"
                onToggleSearch={() => setIsSearchActive(!isSearchActive)}
            />

            {hasData && (
                isSearchActive ? (
                    <SearchBar
                        value={searchText}
                        onChange={setSearchText}
                        onSearch={() => { }}
                    />
                ) : (
                    <ListHeader
                        title={dataCount === 1 ? `${dataCount} city added as favorite` : `${dataCount} cities added as favorite`}
                        buttonTitle="Remove All"
                        onButtonPress={handleRemoveAll}
                    />
                )
            )}

            {favoritesList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <EmptyState
                        message="No favorites yet"
                        imageSource={require('../../assets/empty_list.png')}
                    />
                </View>
            ) : (
                <FlatList
                    data={filteredList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const cityData = weatherDataCache[item];
                        return (
                            <WeatherCard
                                city={item}
                                country={cityData?.location?.country}
                                temperature={cityData ? `${cityData.current.temp_c.toFixed(0)}` : '--'}
                                condition={cityData ? cityData.current.condition.text : 'Loading...'}
                                iconUrl={cityData ? `https:${cityData.current.condition.icon}` : ''}
                                isFavorite={true}
                                onPress={() => console.log(`Navigate to ${item}`)}
                                onToggleFavorite={() => dispatch(removeFavorite(item))}
                            />
                        );
                    }}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContent: {
        paddingHorizontal: Spacing.medium,
        paddingBottom: Spacing.medium,
    },
});
