import React, { ChangeEvent } from "react";
import "./SearchBar.scss";

interface SearchBarProps {
    searchTerm: string;
	// type is a function that accepts the searchTerm, and returns nothing
    setSearchTerm: (searchTerm: string) => void;
}

// SearchBar type is a functional component with the type SearchBarProps
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
	// e is an event of type ChangeEvent that targets an input element of type HTMLInputElement
	const updateSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<input
			className="searchBar"
			placeholder="Search by name"
			value={searchTerm}
			onChange={updateSearchTerm}
		/>
	);
};

export default SearchBar;
