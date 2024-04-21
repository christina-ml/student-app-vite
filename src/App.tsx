import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/navbar/Navbar";
import StudentDetailPage from "./pages/StudentDetailPage";
import AddStudentPage from "./pages/AddStudentPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import "./App.scss";

// create new student

// add button to student list page / home page

// on click move to /students/new
// showing form to create new student

// on error
// show toast with message to try again later
// on succeess
// redirect to student detail oage of new student
// show succcess toast that student was created

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="pageContainer">
					<Routes>
						<Route
							path="/students/:studentId"
							element={<StudentDetailPage />}
						/>
						<Route
							path="/students/new"
							element={<AddStudentPage />}
						/>
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
