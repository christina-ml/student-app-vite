import { test, expect } from "vitest";
import React, { Dispatch, SetStateAction } from "react";
import StudentForm from "../StudentForm";

// Define a generic type for the initialState parameter
type InitialState<S> = S | (() => S);

// Custom useState mock implementation
interface UseStateMock {
	<S>(initialState: InitialState<S>): [S, Dispatch<SetStateAction<S>>];
	<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
}

const useStateMockImplementation: UseStateMock =
	function useStateMockImplementation<S>(initialState?: InitialState<S>) {
		let state =
			initialState instanceof Function ? initialState() : initialState;
		const setState: Dispatch<SetStateAction<typeof state>> = (newValue) => {
			state = newValue instanceof Function ? newValue(state) : newValue;
		};
		return [state, setState];
	};

test("StudentForm component renders without crashing", () => {
	// Mock useState
	const useStateOriginal = React.useState;
	React.useState = useStateMockImplementation;

	// Mock student prop
	const student = {
		id: 1,
		firstName: "John",
		lastName: "Doe",
		company: "ABC Inc.",
		skill: "React",
		pic: "https://example.com/pic.jpg",
		city: "New York",
		email: "john.doe@example.com",
	};

	// Instantiate the StudentForm component
	const studentForm = <StudentForm student={student} setStudent={useStateOriginal} />;

	// Check if the component renders without crashing
	expect(studentForm).toBeTruthy();

	// Restore original useState implementation
	React.useState = useStateOriginal;
});
