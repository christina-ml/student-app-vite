import React, {
	useState,
	// useEffect
} from "react";
import { Link } from "react-router-dom";
import "./StudentCard.scss";
import SingleTextInput from "../singleTextInput/SingleTextInput";
import EmptyView from "../emptyView/EmptyView";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";

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
}

// API URL
// const API = import.meta.env.VITE_API_URL;

const StudentCard = ({ student }: StudentCard) => {
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

	// useEffect(() => {
	// 	if (grades.length) {
	// 		setShowGrades(!showGrades);
	// 	}
	// }, [grades, showGrades]);

	return (
		<div className="studentCard">
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
				<div className="studentCard__toggleIcons">
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
		</div>
	);
};

export default StudentCard;
