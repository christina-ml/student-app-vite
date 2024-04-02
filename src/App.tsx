import "./App.scss";
import StudentList from "./components/studentList/StudentList";
import.meta.env.VITE_API_URL;

function App() {

	return ( 
        <div className="App">
            <StudentList />
        </div>
    )
}

export default App;
