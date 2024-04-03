import React, { useEffect, useState } from "react";
import "./StudentList.scss";
import StudentCard from "../studentCard/StudentCard";

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

	// return or TSX
	return (
		<div className="studentList">
			{students.map((student: Student, index: number) => {
				return <StudentCard key={index} student={student} />;
			})}
		</div>
	);
};

export default StudentList;
