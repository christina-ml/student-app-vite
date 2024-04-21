import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./NavigationButton.scss";

interface NavigationButtonProps {
	buttonText: string;
	url: string;
}

const NavigationButton = ({ buttonText, url }: NavigationButtonProps) => {
	return (
		<div className="navigationButton">
			<Link to={url}>
				<Button variant="contained" size="large">
					{buttonText}
				</Button>
			</Link>
		</div>
	);
};

export default NavigationButton;
