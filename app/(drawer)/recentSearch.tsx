import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../src/store';
import { clearSearch } from '../../src/store/slices/searchSlice';
import WeatherCard from '../../src/components/WeatherCard';
import EmptyState from '../../src/components/EmptyState';
import ListHeader from '../../src/components/ListHeader';
import ListScreenHeader from '../../src/components/ListScreenHeader';
import SearchBar from '../../src/components/SearchBar';
import { filterCitiesBySearchText } from '../../src/utilities/filterHelper';
import ScreenWrapper from '../../src/components/ScreenWrapper';
import { Spacing } from '../../src/utilities/theme';

export default function RecentSearch() {
    const [searchText, setSearchText] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const recentSearchList = useSelector((state: RootState) => state.search.recent);
    const weatherDataCache = useSelector((state: RootState) => state.weather.cache);
    const dispatch = useDispatch();

    const filteredList = filterCitiesBySearchText(recentSearchList, weatherDataCache, searchText);
    const hasData = recentSearchList.length > 0;

    return (
        <ScreenWrapper>
            <ListScreenHeader
                title="Recent Searches"
                onToggleSearch={() => setIsSearchActive(!isSearchActive)}
            />

            {hasData && (
                isSearchActive ? (
                    <View style={styles.searchBarContainer}>
                        <SearchBar
                            value={searchText}
                            onChange={setSearchText}
                            onSearch={() => { }}
                        />
                    </View>
                ) : (
                    <ListHeader
                        title={`You recently searched for`}
                        buttonTitle="Clear All"
                        onButtonPress={() => dispatch(clearSearch())}
                    />
                )
            )}

            {recentSearchList.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <EmptyState
                        message="No recent searches"
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
                                isFavorite={false}
                                onPress={() => console.log(`Navigate to ${item}`)}
                                onToggleFavorite={() => { }}
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
        paddingBottom: Spacing.medium,
        paddingHorizontal: Spacing.medium,
    },
    searchBarContainer: {
        paddingHorizontal: Spacing.medium,
        paddingBottom: Spacing.small,
    },
});
