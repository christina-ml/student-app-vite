import { FaCheck } from "react-icons/fa";
import "./Contact.scss";

const Contact = () => {
	return (
		<div className="contact">
			<div className="contact__info">
				<div className="contact__title">Contact Jordan Manley</div>
				<div className="contact__subheader">
					Like what you see? I'm a graduate Pursuit, looking for my
					first fulltime job.
				</div>
				<div className="contact__salesPoints">
					<div className="contact__salesPoint">
						<div className="contact__salesPointIcon">
							<FaCheck />
						</div>
						<div className="contact__salesPointText">
							This project was created by me to show my love of
							Robot learners. Message me if you could talk
							robotics for hours.
						</div>
					</div>
					<div className="contact__salesPoint">
						<div className="contact__salesPointIcon">
							<FaCheck />
						</div>
						<div className="contact__salesPointText">
							If you are looking for a strong developer, reach out
							to me.
						</div>
					</div>
					<div className="contact__salesPoint">
						<div className="contact__salesPointIcon">
							<FaCheck />
						</div>
						<div className="contact__salesPointText">
							I was the chess champion in my preschool for 3 years
							running.
						</div>
					</div>
				</div>
			</div>
			<div className="contact__info">
				<div className="contact__title">Get In Touch</div>
				<div className="contact__subheader">
					<span>Phone: </span>583-284-9987
				</div>
				<div className="contact__subheader">Address:</div>
				<div className="contact__subheader">
					123 Sesame St <br />
					Podunk, FL 49823
				</div>
				<div className="contact__subheader">
					<span>Email:</span> writetome@gmail.com
				</div>
			</div>
		</div>
	);
};

export default Contact;
