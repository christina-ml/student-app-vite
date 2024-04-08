import React from "react";
import "./StudentCard.scss";

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

const StudentCard = ({student}: StudentCard) => {
	const { firstname, lastname, company, skill, pic, city, email, grades } =
		student;

	// functions
	// const calculateAverage = (grades: string[]) => {
	// let sum = 0;

	// grades.map(grade => {
	//     sum += Number(grade);
	// });

	// return sum / grades.length;

	// 	const sum = grades.reduce((sum, val) => sum + Number(val), 0);
	// 	return sum / grades.length;
	// };

	return (
		<div className="studentCard">
			<div className="studentCard__profilePic">
				<img src={pic} alt={`${firstname} photo`} />
			</div>
			<div className="studentCard__info">
				<div className="studentCard__name">
					{`${firstname}  ${lastname}`}
				</div>
				<div className="studentCard__infoLine">
					Email: {email}
				</div>
				<div className="studentCard__infoLine">
					Company: {company}
				</div>
				<div className="studentCard__infoLine">
					Skill: {skill}
				</div>
				<div className="studentCard__infoLine">
					{/* Average: {calculateAverage(grades)}% */}
				</div>
			</div>
		</div>
	);
};

export default StudentCard;
