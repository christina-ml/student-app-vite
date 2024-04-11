import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import StudentCard from "../components/studentCard/StudentCard";

interface Student {
	id: number;
	// firstname: string;
	// lastname: string;
	firstName: string;
	lastName: string;
	company: string;
	skill: string;
	pic: string;
	city: string;
	email: string;
}

const initialStudent: Student = {
	id: 0,
	// firstname: "",
	// lastname: "",
	firstName: "",
	lastName: "",
	company: "",
	skill: "",
	pic: "",
	city: "",
	email: "",
};

// API URL
const API = import.meta.env.VITE_API_URL;

const StudentDetailPage = () => {
	const params = useParams();
	const location = useLocation();
	const [student, setStudent] = useState<Student>(initialStudent);

	const studentId: string | undefined = params.studentId;

	// with the student Id, we can fetch student info
	// from our API
	useEffect(() => {
		if (location.state?.student) {
			setStudent(location.state?.student);
		} else {
			fetch(`${API}/students/${studentId}`)
				.then((response) => response.json())
				.then((data) => {
					console.log("StudentDetailPage data:", data.data)
					setStudent(data.data);
				});
		}
	}, [location.state?.student, studentId]);

	return (
		<div className="studentDetailPage">
			{Object.keys(student).length > 0 && (
				<StudentCard student={student} />
			)}
		</div>
	);
};

export default StudentDetailPage;
