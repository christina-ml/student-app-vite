import StudentForm from "../components/studentForm/StudentForm";
import { Student } from "../utils/Types";

const AddStudentPage = () => {
    // Define an initial empty student object
    const initialStudent: Student = {
        id: 0,
        firstName: "",
        lastName: "",
        company: "",
        skill: "",
        pic: "",
        email: "",
        tagArr: []
    };

    return (
        <div>
            <StudentForm
                student={initialStudent}
                setStudent={() => {}}
                title="Add"
                method="POST"
            />
        </div>
    );
};

export default AddStudentPage;
