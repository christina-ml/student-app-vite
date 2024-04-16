import React from "react";
import "./EmptyView.scss";

interface StyleObjProps {
	display?: string;
	padding?: string;
}

interface EmptyViewProps {
	text?: string;
	center?: StyleObjProps;
}

const styleObj = {
	center: {
		display: "table",
		padding: "200px 0",
	},
};

const EmptyView: React.FC<EmptyViewProps> = ({ text = "No Results", center = {} } ) => {
	return (
		<div style={center ? styleObj.center : {}} className="emptyView">
			{text}
		</div>
	);
};

export default EmptyView;
