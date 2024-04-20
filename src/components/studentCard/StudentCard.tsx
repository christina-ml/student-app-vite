import React, {
	useState,
	// useEffect
} from "react";
import { Link, useNavigate } from "react-router-dom";
import DialogBox from "../dialogBox/DialogBox";
import EmptyView from "../emptyView/EmptyView";
import SingleTextInput from "../singleTextInput/SingleTextInput";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import "./StudentCard.scss";

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

// each student has the Student interface
interface StudentCard {
	student: Student;
	showDelete?: boolean;
}

// API URL
// const API = import.meta.env.VITE_API_URL;
const API = import.meta.env.VITE_API_URL_PURSUIT;

const StudentCard = ({ student, showDelete = false }: StudentCard) => {
	const navigate = useNavigate();

	// props deconstructed
	const {
		id,
		firstName,
		lastName,
		company,
		skill,
		pic,
		// city,
		email,
		grades = [],
	} = student;

	// hooks
	// const [grades, setGrades] = useState<string[]>([]);
	const [showGrades, setShowGrades] = useState<boolean>(false);
	const [gradesLoading, setGradesLoading] = useState<boolean>(false);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>("");
	const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
	const [deleteUserLoading, setDeleteUserLoading] = useState<boolean>(false);
	const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

	// functions
	const calculateAverage = (grades: string[]) => {
		let sum: number = 0;

		grades.map((grade: string) => {
			sum += Number(grade);
		});

		return sum / grades.length;
	};

	const hideGrades = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		e.stopPropagation();
		e.preventDefault();
		setShowGrades(false);
	};

	const fetchAndShowGrades = (
		e: React.MouseEvent<SVGElement, MouseEvent>
	) => {
		e.stopPropagation();
		e.preventDefault();

		// do we already have the grades?
		if (grades.length > 0) {
			setShowGrades(true);
		} else {
			setGradesLoading(true);

			// fetch(`${API}/students/${id}/grades`)
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		setGrades(data);
			//     setShowGrades(true);
			// 		setGradesLoading(false);
			// 	});
		}
	};
	// console.log("GRADES:", grades);

	const showDeleteUserDialogue = () => {
		setShowDeleteDialog(true);
	};

	const deleteUser = () => {
		setDeleteUserLoading(true);

		// url to delete
		const url = `${API}/students/${id}`;

		fetch(url, { method: "DELETE" })
			.then((response) => response.json())
			.then((data) => {
				// redirect to home page
				navigate("/", {
					state: {
						studentName: `${data.firstname} ${data.lastname}`,
					},
				});
				// show toast that user was deleted
				setDeleteUserLoading(false);
			})
			.catch((err) => {
				console.error(err);
				// show toast that delete was unsuccessful
				setDeleteUserLoading(false);
				setShowSnackbar(true);
			});
	};

	// useEffect(() => {
	// 	if (grades.length) {
	// 		setShowGrades(!showGrades);
	// 	}
	// }, [grades, showGrades]);

	return (
		<div className="studentCard">
			<Snackbar
				open={showSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={1500}
				onClose={() => setShowSnackbar(false)}
			>
				<Alert severity="error">
					An error occurred while deleting — try again later.
				</Alert>
			</Snackbar>

			<Link to={`/students/${id}`} state={{ student: student }}>
				<div className="studentCard__profilePic">
					<img src={pic} alt={`${firstName} photo`} />
				</div>
				<div className="studentCard__info">
					<div className="studentCard__name">
						{`${firstName}  ${lastName}`}
					</div>
					<div className="studentCard__infoLine">Email: {email}</div>
					<div className="studentCard__infoLine">
						Company: {company}
					</div>
					<div className="studentCard__infoLine">Skill: {skill}</div>
					<div
						className="studentCard__gradesList"
						style={{ display: showGrades ? "block" : "none" }}
					>
						{grades.length > 0 && (
							<>
								<div className="studentCard__gradeAverage">
									Average:{" "}
									{grades.length && calculateAverage(grades)}%
								</div>
								{grades.map((grade: string, index: number) => {
									return (
										<div key={index}>
											<span>Test {index + 1}:</span>
											<span>{grade}%</span>
										</div>
									);
								})}
							</>
						)}
						{grades.length === 0 && (
							<EmptyView text="No Grades for this Student" />
						)}
					</div>
				</div>
				<div className="studentCard__actionIcons">
					{gradesLoading && (
						<AiOutlineReload
							className="studentCard__toggleIcon-spinning"
							size="1.8em"
						/>
					)}
					{!showGrades && !gradesLoading && (
						<FaPlus
							className="studentCard__toggleIcon"
							onClick={(e) => fetchAndShowGrades(e)}
							size="1.8em"
						/>
					)}
					{showGrades && !gradesLoading && (
						<FaMinus
							className="studentCard__toggleIcon"
							onClick={(e) => hideGrades(e)}
							size="1.8em"
						/>
					)}
				</div>
			</Link>
			<div className="studentCard__tagCollectionRow">
				<div className="studentCard__tagCollection">
					<div className="studentCard__tags">
						{tags.map((tag, index) => {
							return (
								<span
									className="studentCard__tag"
									key={tag + index}
								>
									{tag}
								</span>
							);
						})}
					</div>
					<div className="studentCard__tagInput">
						<SingleTextInput
							onSubmit={setTags}
							collection={tags}
							searchTerm={tag}
							setSearchTerm={setTag}
							width="26%"
							placeholder="Add a tag"
						/>
					</div>
				</div>
				{showDelete && (
					<div>
						{deleteUserLoading && (
							<AiOutlineReload
								className="studentCard__toggleIcon-spinning"
								size="1.8em"
							/>
						)}
						{!showGrades && !deleteUserLoading && (
							<FaTrash
								className="studentCard__trashIcon"
								onClick={() => showDeleteUserDialogue()}
								size="1.8em"
							/>
						)}
					</div>
				)}
			</div>
			<DialogBox
				open={showDeleteDialog}
				setOpen={setShowDeleteDialog}
				deleteUser={deleteUser}
			/>
		</div>
	);
};

export default StudentCard;
