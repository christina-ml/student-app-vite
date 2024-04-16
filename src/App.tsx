// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import Navbar from "./layout/navbar/Navbar";
import StudentList from "./components/studentList/StudentList";
import StudentDetailsPage from "./pages/StudentDetailPage";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path="/students/:studentId"
						element={<StudentDetailsPage />}
					/>
					<Route path="/" element={<StudentList />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
