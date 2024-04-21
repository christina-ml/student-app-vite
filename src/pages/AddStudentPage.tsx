import StudentForm from "../components/studentForm/StudentForm";

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    skill: string;
    pic: string;
    city?: string;
    email: string;
    grades?: string[];
}

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
