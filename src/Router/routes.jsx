import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Login from "../pages/Login.jsx";
import StudentSignUp from "../pages/SignUp.jsx";
import AddCourse from "../pages/AddCourse.jsx";
import CourseList from "../pages/AllCourse.jsx";
import AddDept from "../pages/AddDept.jsx";
import Registration from "../pages/Registration.jsx";
import { Toaster } from "react-hot-toast";
import CourseListWithStudent from "../pages/CourseEnrolledStudent.jsx";
import StudentList from "../pages/AllStudents.jsx";
import AddAdvisorForm from "../pages/AddAdvisor.jsx";
import RegistrationList from "../pages/AllRegistration.jsx";
import StudentProfile from "../pages/StudentProfile.jsx";
import AdminProfile from "../pages/Adminprofile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <CourseList />,
      },
      {
        path: "/addCourse",
        element: <AddCourse />,
      },
      {
        path: "/allCourse",
        element: <CourseList />,
      },
      {
        path: "/addDept",
        element: <AddDept />,
      },
      {
        path: "/allStudents",
        element: <StudentList />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/courseWiseStudent",
        element: <CourseListWithStudent />,
      },
      {
        path: "/addAdvisors",
        element: <AddAdvisorForm />,
      },
      {
        path: "/courseRegistrations",
        element: <RegistrationList />,
      },
      {
        path: "/studentProfile",
        element: <StudentProfile />,
      },
      {
        path: "/adminProfile",
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <StudentSignUp />,
  },
]);

export default router;
