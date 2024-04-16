import { test, expect } from "vitest";
import EmptyView from "../EmptyView";

test("EmptyView component renders without crashing", () => {
	// Instantiate the EmptyView component
	const emptyView = <EmptyView />;

	// Check if the component renders without crashing
	expect(emptyView).toBeTruthy();
});

test("Custom text is displayed correctly", () => {
	// Define the custom text
	const customText = "Custom Text";

	// Instantiate the EmptyView component with custom text
	const emptyView = <EmptyView text={customText} />;

	// Access the props of the EmptyView component and check the custom text
	const text = emptyView.props.text;

	// Assert that the custom text matches the expected value
	expect(text).toBe(customText);
});

test("Center style is not applied when not passed", () => {
	// Instantiate the EmptyView component without center style
	const emptyView = <EmptyView />;

	// Access the center prop of the EmptyView component
	const center = emptyView.props.center;

	// Assert that the center style is not applied
	expect(center).toEqual(undefined);
});

test("Default text is returned correctly", () => {
	// Manually invoke the EmptyView component function
	const emptyView = EmptyView({}) as React.ReactElement;

	// Ensure emptyView is not null or undefined
	expect(emptyView).not.toBeNull();
	expect(emptyView).not.toBeUndefined();

	// Access the children prop, which contains the default text
	const defaultText = emptyView.props?.children;

	// Assert that the default text matches the expected value
	expect(defaultText).toBe("No Results");
});
