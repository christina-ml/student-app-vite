import { useEffect } from "react";
import "./SingleTextInput.scss";

interface SingleTextInputProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	collection?: string[];
	onSubmit?: (collection: string[]) => void;
	placeholder?: string;
	width?: string;
}

const SingleTextInput = ({
	searchTerm,
	setSearchTerm,
	collection = [],
	onSubmit,
	placeholder = "Search by name",
	width = "93%",
}: SingleTextInputProps) => {
	const styles = {
		width: width,
	};

	useEffect(() => {
		const handleSubmit = () => {
			if (onSubmit) {
				onSubmit([...collection, searchTerm]);
			}
		};

		const keyDownHandler = (event: KeyboardEvent) => {
			// console.log("User pressed: ", event.key);

			if (event.key === "Enter") {
				event.preventDefault();

				// 👇️ call submit function here
				handleSubmit();
			}
		};

		document.addEventListener("keydown", keyDownHandler);

		return () => {
			document.removeEventListener("keydown", keyDownHandler);
		};
	}, [collection, onSubmit, searchTerm]);

	return (
		<input
			style={styles}
			className="searchBar"
			placeholder={placeholder}
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
		/>
	);
};

export default SingleTextInput;
