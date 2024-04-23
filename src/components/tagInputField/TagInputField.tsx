import React, { useState, useEffect } from "react";
import "./TagInputField.scss";

interface TagInputFieldProps {
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
	id: number;
}

const TagInputField = ({ setTags, id }: TagInputFieldProps) => {
	const [tag, setTag] = useState<string>("");

	useEffect(() => {
		const handleSubmit = (pendingTag: string) => {
			setTags((tags) => [...tags, pendingTag]);
			setTag("");
		};

		const keyDownHandler = (event: Event) => {
			if (event instanceof KeyboardEvent && event.key === "Enter") {
				event.preventDefault();
				const input = document.getElementById(
					"studentTagInput" + id
				) as HTMLInputElement;
				const pendingTag = input.value.trim();
				if (pendingTag) {
					handleSubmit(pendingTag);
				}
			}
		};

		const input = document.getElementById(
			"studentTagInput" + id
		) as HTMLInputElement;
		input.addEventListener("keydown", keyDownHandler);

		return () => {
			input.removeEventListener("keydown", keyDownHandler);
		};
	}, [id, setTags]);

	return (
		<input
			className="tagInputField"
			id={"studentTagInput" + id}
			placeholder="Add a tag"
			value={tag}
			onChange={(e) => setTag(e.target.value)}
		/>
	);
};

export default TagInputField;
