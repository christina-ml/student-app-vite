import { useEffect, useState } from "react";
import {
	useParams,
	// useLocation
} from "react-router-dom";

import StudentCard from "../components/studentCard/StudentCard";
import StudentForm from "../components/studentForm/StudentForm";

interface Student {
	id: number;
	firstName: string;
	lastName: string;
	company: string;
	skill: string;
	pic: string;
	city?: string;
	email: string;
	grades?: string[];
}

const initialStudent: Student = {
	id: 0,
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
	// const location = useLocation();
	const [student, setStudent] = useState<Student>(initialStudent);

	const studentId: string | undefined = params.studentId;

	// with the student Id, we can fetch student info
	// from our API
	useEffect(() => {
		// if (location.state?.student) {
		// 	setStudent(location.state?.student);
		// }

		fetch(`${API}/students/${studentId}`)
			.then((response) => response.json())
			.then((data) => {
				setStudent(data.data);
			});
		// }
	}, []);

	// update student
	// create update componentn
	// with form for all fields
	// on submit, show loader
	// on success show toast
	// on fail show toast (error)s
	// update data on student page

	return (
		<div className="studentDetailPage">
			{Object.keys(student).length > 0 && (
				<StudentCard student={student} showDelete />
			)}
			{Object.keys(student).length > 0 && (
				<StudentForm student={student} setStudent={setStudent} />
			)}
		</div>
	);
};

export default StudentDetailPage;
