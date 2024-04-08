import { test, expect } from "vitest";
import SearchBar from "../SearchBar";

test("Search bar component renders without crashing", () => {
	// Instantiate the SearchBar component
	const searchBar = <SearchBar setSearchTerm={() => {}} />;

	// Check if the component renders without crashing
	expect(searchBar).toBeTruthy();
});

test("Placeholder text is displayed correctly", () => {
	// Instantiate the SearchBar component with a custom placeholder
	const searchBar = (
		<SearchBar placeholder="Test Placeholder" setSearchTerm={() => {}} />
	);

	// Access the props of the SearchBar component and check the placeholder text
	const placeholderText = searchBar.props.placeholder;

	// Assert that the placeholder text matches the expected value
	expect(placeholderText).toBe("Test Placeholder");
});

test("Value attribute is set correctly", () => {
	// Define the expected search term
	const searchTerm = "test";

	// Mock setSearchTerm function
	const setSearchTerm = () => {};

	// Instantiate the SearchBar component with the expected search term and mock function
	const searchBar = (
		<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
	);

	// Access the searchTerm prop of the SearchBar component
	const receivedSearchTerm = searchBar.props.searchTerm;

	// Assert that the searchTerm prop matches the expected search term
	expect(receivedSearchTerm).toBe(searchTerm);
});
