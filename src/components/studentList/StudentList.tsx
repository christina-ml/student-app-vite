import React, { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import StudentCard from "../studentCard/StudentCard";
import "./StudentList.scss";

// API URL
const API = import.meta.env.VITE_API_URL;

interface Student {
	id: number;
	firstname: string;
	lastname: string;
	company: string;
	skill: string;
	pic: string;
	city: string;
	email: string;
}

const StudentList = () => {
	// hooks
	const [students, setStudents] = useState<Student[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");

	// functions
	useEffect(() => {
		// reach out to the backend
		fetch(API)
			.then((response) => response.json())
			.then((data: Student[]) => {
				console.log(data);
				setStudents(data);
			});
		// get our students
		// update our students hook with the new data
	}, []); // empty array means run on mount

	// when search term is updated, this component will rerender
	// what to do on a re-render?
	let filteredStudents: Student[] = students;

	if (searchTerm) {
		filteredStudents = students.filter((student: Student) => {
			const fullName: string = `${student.firstname} ${student.lastname}`;
			const fullNameToLowerCase: string = fullName.toLowerCase();
			const searchTermToLowerCase: string = searchTerm.toLowerCase();
			return fullNameToLowerCase.includes(searchTermToLowerCase);
		});
	}

	// return or TSX
	return (
		<div className="studentList">
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			{filteredStudents.map((student: Student, index: number) => {
				return <StudentCard key={index} student={student} />;
			})}
			{filteredStudents.length == 0 && (
				<div className="studentList__noResults">No Results</div>
			)}
		</div>
	);
};

export default StudentList;
