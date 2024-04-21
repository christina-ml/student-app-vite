import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AiOutlineReload } from "react-icons/ai";
import "./StudentUpdateForm.scss";

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
interface StudentUpdateFormProps {
	student: Student;
}

// API URL
const API = import.meta.env.VITE_API_URL;

const StudentUpdateForm = ({ student }: StudentUpdateFormProps) => {
	const [firstname, setFirstname] = useState<string>(student.firstName);
	const [lastname, setLastname] = useState<string>(student.lastName);
	const [company, setCompany] = useState<string>(student.company);
	const [city, setCity] = useState<string | undefined>(student.city);
	const [skill, setSkill] = useState<string>(student.skill);
	const [pic, setPic] = useState<string>(student.pic);
	const [anyChanges, setAnyChanges] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setAnyChanges(true);

		const field = e.target.name;

		switch (field) {
			case "firstname":
				setFirstname(e.target.value);
				break;
			case "lastname":
				setLastname(e.target.value);
				break;
			case "company":
				setCompany(e.target.value);
				break;
			case "city":
				setCity(e.target.value);
				break;
			case "skill":
				setSkill(e.target.value);
				break;
			case "pic":
				setPic(e.target.value);
				break;
		}
	};

	const handleSubmit = () => {
		// loading state
		setLoading(true);

		// set our target url
		const url = `${API}/students/${student.id}`;

		// what data are we passing to our backend?
		// what http method are we using

		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstname,
				lastname,
				company,
				city,
				skill,
				pic,
			}),
		};

		// fetch
		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				// success state
				console.log(data);
				setAnyChanges(false);
				// show success toast
				//TODO

				// error state
				//TODO

				// set loading to false
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				// let user know an error has occurred
				setShowSnackbar(true);
			});
	};

	return (
		<div className="studentUpdateForm">
			<Snackbar
				open={showSnackbar}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={1500}
				onClose={() => setShowSnackbar(false)}
			>
				<Alert severity="error">
					An error occurred while updating — try again later.
				</Alert>
			</Snackbar>
			<div className="studentUpdateForm__title">Update Student</div>
			<div className="studentUpdateForm__inputs">
				<TextField
					id="outlined-basic"
					label="First Name"
					variant="outlined"
					value={firstname}
					name="firstname"
					onChange={(e) => handleChange(e)}
				/>
				<TextField
					id="outlined-basic"
					label="Last Name"
					variant="outlined"
					value={lastname}
					name="lastname"
					onChange={(e) => handleChange(e)}
				/>
				<TextField
					id="outlined-basic"
					label="Company"
					variant="outlined"
					value={company}
					name="company"
					onChange={(e) => handleChange(e)}
				/>
				<TextField
					id="outlined-basic"
					label="City"
					variant="outlined"
					value={city}
					name="city"
					onChange={(e) => handleChange(e)}
				/>
				<TextField
					id="outlined-basic"
					label="Skill"
					variant="outlined"
					value={skill}
					name="skill"
					onChange={(e) => handleChange(e)}
				/>
				<TextField
					id="outlined-basic"
					label="Pic Url"
					variant="outlined"
					value={pic}
					name="pic"
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className="studentUpdateForm__submit">
				<Button
					variant="contained"
					size="large"
					disabled={!anyChanges}
					onClick={handleSubmit}
					endIcon={
						loading && (
							<AiOutlineReload className="studentUpdateForm__submitLoader-spinning" />
						)
					}
				>
					Update
				</Button>
			</div>
		</div>
	);
};

export default StudentUpdateForm;
