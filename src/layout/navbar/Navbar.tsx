// import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
	// const [showNavbarItems, setShowNavbarItems] = useState<boolean>(false);

	return (
		<div className="navbar">
			<div className="navbar__logo">
				<Link to="/">Student App</Link>
			</div>
			<div className="navbar__menuItems">
				<li className="navbar__menuItem">
					<Link to="/">Students</Link>
				</li>
				<li className="navbar__menuItem">
					<Link to="/about">About</Link>
				</li>
				<li className="navbar__menuItem">
					<Link to="/contact">Contact</Link>
				</li>
			</div>
			<div className="navbar__toggleIcon">=</div>
		</div>
	);
};

export default Navbar;
