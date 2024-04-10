import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentCard.scss";
import { FaPlus, FaMinus } from "react-icons/fa";

/* 
	Important Note: The endpoint for the deployed database API being used does not have grades.
	Ideally, each student should have their own grades in the database.
	This variable for `grades` is being hardcoded as an array, so that the app functionality does not break.
*/
const grades: string[] = ["78", "100", "92", "86", "89", "88", "91", "87"];

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

// each student has the Student interface
interface StudentCard {
	student: Student;
}

const StudentCard = ({ student }: StudentCard) => {
	// props deconstructed
	const {
		firstname,
		lastname,
		company,
		skill,
		pic,
		// city,
		email,
		// grades
	} = student;

	// hooks
	const [showGrades, setShowGrades] = useState<boolean>(false);

	// functions
	const calculateAverage = (grades: string[]) => {
		let sum: number = 0;

		grades.map((grade: string) => {
			sum += Number(grade);
		});

		return sum / grades.length;
	};

	const toggleGrades = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
		e.stopPropagation();
		e.preventDefault();
		setShowGrades(!showGrades);
	};

	return (
		<div className="studentCard">
			<Link to={`/students/${student.id}`} state={{ student: student }}>
				<div className="studentCard__profilePic">
					<img src={pic} alt={`${firstname} photo`} />
				</div>
				<div className="studentCard__info">
					<div className="studentCard__name">
						{`${firstname}  ${lastname}`}
					</div>
					<div className="studentCard__infoLine">Email: {email}</div>
					<div className="studentCard__infoLine">
						Company: {company}
					</div>
					<div className="studentCard__infoLine">Skill: {skill}</div>
					<div className="studentCard__infoLine">
						Average: {calculateAverage(grades)}%
					</div>
					<div
						className="studentCard__gradesList"
						style={{ display: showGrades ? "block" : "none" }}
					>
						{grades.map((grade: string, index: number) => {
							return (
								<div key={index}>
									<span>Test {index + 1}:</span>
									<span>{grade}%</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="studentCard__toggleIcons">
					{!showGrades && (
						<FaPlus
							className="studentCard__toggleIcon"
							onClick={(e) => toggleGrades(e)}
							size="1.8em"
						/>
					)}
					{showGrades && (
						<FaMinus
							className="studentCard__toggleIcon"
							onClick={(e) => toggleGrades(e)}
							size="1.8em"
						/>
					)}
				</div>
			</Link>
		</div>
	);
};

export default StudentCard;
