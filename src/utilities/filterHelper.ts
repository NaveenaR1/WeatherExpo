export const filterCitiesBySearchText = (
    cityList: string[],
    cache: { [key: string]: any },
    searchText: string
) => {
    const query = searchText.toLowerCase();

    return cityList.filter((city) => {
        const data = cache[city];
        const cityName = data?.location?.name?.toLowerCase() || '';
        const country = data?.location?.country?.toLowerCase() || '';

        return cityName.includes(query) || country.includes(query);
    });
};
