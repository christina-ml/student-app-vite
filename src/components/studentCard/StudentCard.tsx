import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StudentCard.scss";
import SingleTextInput from "../singleTextInput/SingleTextInput";
import { FaPlus, FaMinus } from "react-icons/fa";

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
	grades?: string[];
}

// each student has the Student interface
interface StudentCard {
	student: Student;
}

const StudentCard = ({ student }: StudentCard) => {
	// props deconstructed
	const {
		// firstname,
		// lastname,
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
	const [showGrades, setShowGrades] = useState<boolean>(false);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState<string>("");

	// console.log("tag:", tag);

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
					{/* <img src={pic} alt={`${firstname} photo`} /> */}
					<img src={pic} alt={`${firstName} photo`} />
				</div>
				<div className="studentCard__info">
					<div className="studentCard__name">
						{/* {`${firstname}  ${lastname}`} */}
						{`${firstName}  ${lastName}`}
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
