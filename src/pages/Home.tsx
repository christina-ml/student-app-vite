import NavigationButton from "../components/navigationButton/NavigationButton";
import StudentList from "../components/studentList/StudentList";

const Home = () => {
	return (
		<div className="home">
			<NavigationButton
				buttonText={"Add New Student"}
				url={"/students/new"}
			/>
			<StudentList />
		</div>
	);
};

export default Home;
