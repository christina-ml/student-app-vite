import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Student } from "../../utils/Types"; 
import SearchBar from "../searchBar/SearchBar";
import StudentCard from "../studentCard/StudentCard";
import EmptyView from "../emptyView/EmptyView";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import "./StudentList.scss";

// API URL
const API = import.meta.env.VITE_API_URL;

const StudentList = () => {
	const location = useLocation();

	// hooks
	const [studentsList, setStudentList] = useState<Student[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [tagSearch, setTagSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

	// functions
	useEffect(() => {
		setLoading(true);

		if (location?.state?.studentName) {
			setShowSnackbar(true);
		}

		// reach out to the backend
		fetch(API)
			.then((response) => response.json())
			.then((data) => {
				for (const student of data.students) {
					student.tagArr = [];
				}

				const studentData: Student[] = data.students;
				setStudentList(studentData);
				setLoading(false);
			});
	}, [location?.state?.studentName]);

	// when search term is updated, this component will re-render
	let filteredStudents: Student[] = studentsList;

	if (searchTerm) {
		filteredStudents = studentsList.filter((student: Student) => {
			const fullName: string = `${student.firstName} ${student.lastName}`;
			const fullNameToLowerCase: string = fullName.toLowerCase();
			const searchTermToLowerCase: string = searchTerm.toLowerCase();
			return fullNameToLowerCase.includes(searchTermToLowerCase);
		});
	}

	if (tagSearch) {
		filteredStudents = filteredStudents.filter((student) => {
			for (const tag of student.tagArr) {
				const partialTag = tag.toLowerCase().slice(0, tagSearch.length);

				if (partialTag === tagSearch.toLowerCase()) {
					return true;
				}
			}
		});
	}

	// return or TSX
	return (
		<div className="studentList">
			<Snackbar
				open={showSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={1500}
				onClose={() => setShowSnackbar(false)}
			>
				<Alert>
					{location?.state?.studentName} was successfully deleted.
				</Alert>
			</Snackbar>
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<SearchBar
				searchTerm={tagSearch}
				setSearchTerm={setTagSearch}
				placeholder="Search by tag"
			/>
			{filteredStudents.map((student: Student) => {
				return <StudentCard key={student.id} student={student} />;
			})}
			{loading && <EmptyView center={{}} text="Loading..." />}
			{!loading && filteredStudents.length === 0 && (
				<EmptyView center={{}} />
			)}
		</div>
	);
};

export default StudentList;
