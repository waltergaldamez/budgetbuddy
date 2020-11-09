import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search for a user"
            onChangeText={onChangeSearch}
            value={searchQuery}
            />
    );
};

export default SearchBar;