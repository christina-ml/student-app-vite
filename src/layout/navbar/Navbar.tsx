import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
	const navigate = useNavigate();

	const [showNavbarItems, setShowNavbarItems] = useState<boolean>(false);

	useEffect(() => {
		if (showNavbarItems) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [showNavbarItems]);

	const toggleMenuItems = () => {
		setShowNavbarItems(!showNavbarItems);
	};

	const handleNavigation = (e) => {
		// close menu
		setShowNavbarItems(false);
		// navigate user to correct path
		navigate(e.target.id);
	};

	return (
		<div className="navbar">
			<div
				className="navbar__overlay"
				style={{ display: showNavbarItems ? "block" : "none" }}
				onClick={() => setShowNavbarItems(false)}
			></div>
			<div className="navbar__links">
				<div className="navbar__logo" onClick={handleNavigation} id="/">
					Student App
				</div>
				<div
					className={
						showNavbarItems
							? "navbar__menuItems-active"
							: "navbar__menuItems"
					}
				>
					<li
						className="navbar__menuItem"
						onClick={handleNavigation}
						id="/"
					>
						Students
					</li>
					<li
						className="navbar__menuItem"
						onClick={handleNavigation}
						id="/about"
					>
						About
					</li>
					<li
						className="navbar__menuItem"
						onClick={handleNavigation}
						id="/contact"
					>
						Contact
					</li>
				</div>
				<div className="navbar__toggleIcon" onClick={toggleMenuItems}>
					=
				</div>
			</div>
		</div>
	);
};

export default Navbar;
