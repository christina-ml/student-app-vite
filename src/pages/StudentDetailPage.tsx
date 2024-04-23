import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Student } from "../utils/Types";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import StudentCard from "../components/studentCard/StudentCard";
import StudentForm from "../components/studentForm/StudentForm";

const initialStudent: Student = {
	id: 0,
	firstName: "",
	lastName: "",
	company: "",
	skill: "",
	pic: "",
	city: "",
	email: "",
	tagArr: [],
};

// API URL
const API = import.meta.env.VITE_API_URL;

const StudentDetailPage = () => {
	const params = useParams();
	const location = useLocation();
	const [student, setStudent] = useState<Student>(initialStudent);
	const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

	const studentId: string | undefined = params.studentId;

	// with the student Id, we can fetch student info
	// from our API
	useEffect(() => {
		if (location?.state?.fromCreateStudent) {
			setShowSnackbar(true);
		}

		fetch(`${API}/students/${studentId}`)
			.then((response) => response.json())
			.then((data) => {
				setStudent(data.data);
			});
		// }
	}, [location?.state?.fromCreateStudent, studentId]);

	return (
		<div className="studentDetailPage">
			<Snackbar
				open={showSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={1500}
				onClose={() => setShowSnackbar(false)}
			>
				<Alert>
					{location?.state?.studentName} was successfully created.
				</Alert>
			</Snackbar>
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
