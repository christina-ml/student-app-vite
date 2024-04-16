import { useEffect, useState } from "react";
// import SearchBar from "../searchBar/SearchBar";
import SingleTextInput from "../singleTextInput/SingleTextInput";
import StudentCard from "../studentCard/StudentCard";
import EmptyView from "../emptyView/EmptyView";
import "./StudentList.scss";

// API URL
const API = import.meta.env.VITE_API_URL;

interface Student {
	id: number;
	firstName: string;
	lastName: string;
	company: string;
	skill: string;
	pic: string;
	city: string;
	email: string;
}

const StudentList = () => {
	// hooks
	const [studentsList, setStudentList] = useState<Student[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	// functions
	useEffect(() => {
		setLoading(true);

		// reach out to the backend
		fetch(API)
			.then((response) => response.json())
			.then((data) => {
				const studentData: Student[] = data.students;
				setStudentList(studentData);
				setLoading(false);
			});
		// get our students
		// update our students hook with the new data
	}, []); // empty array means run on mount

	// when search term is updated, this component will rerender
	// what to do on a re-render?
	let filteredStudents: Student[] = studentsList;

	if (searchTerm) {
		filteredStudents = studentsList.filter((student: Student) => {
			// const fullName: string = `${student.firstname} ${student.lastname}`;
			const fullName: string = `${student.firstName} ${student.lastName}`;
			const fullNameToLowerCase: string = fullName.toLowerCase();
			const searchTermToLowerCase: string = searchTerm.toLowerCase();
			return fullNameToLowerCase.includes(searchTermToLowerCase);
		});
	}

	// return or TSX
	return (
		<div className="studentList">
			<SingleTextInput
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			{filteredStudents.map((student: Student) => {
				return <StudentCard key={student.id} student={student} />;
			})}
			{loading && <EmptyView center={{}} text="Loading..." />}
			{!loading && filteredStudents.length === 0 && <EmptyView center={{}} />}
		</div>
	);
};

export default StudentList;
