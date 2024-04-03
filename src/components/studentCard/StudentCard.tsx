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

const StudentCard = (student: StudentCard) => {
	const { firstname, lastname, company, skill, pic, city, email, grades } =
		student.student;

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
			<div>
				<img src={pic} alt={`${firstname} photo`} />
			</div>
			<div className="studentCard__name">
				{`${firstname}  ${lastname}`}
			</div>
			<div>Email: {email}</div>
			<div>Company: {company}</div>
			<div>Skill: {skill}</div>
			{/* <div>Average: {calculateAverage(grades)}%</div> */}
		</div>
	);
};

export default StudentCard;