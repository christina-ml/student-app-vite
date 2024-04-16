// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import Navbar from "./layout/navbar/Navbar";
import StudentList from "./components/studentList/StudentList";
import StudentDetailPage from "./pages/StudentDetailPage";

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
						<Route path="/" element={<StudentList />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
