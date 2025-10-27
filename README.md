# 🎓 UniRoll

Welcome to **UniRoll**, an advanced academic management platform that simplifies the student registration and advisory process for universities and colleges.

![UniRoll Banner](./assets/banner.png)

---

## 🧩 Concept

**UniRoll** serves as a unified platform that connects students, advisors, and administrators, streamlining the entire academic registration and advisory system.

![Concept Diagram](./assets/concept.png)

---

## 🚩 Problems Solved

- **Manual Paperwork:** Eliminates the hassle of physical registration forms and advisor assignments.
- **Unorganized Data:** Centralizes student, course, and registration data in a structured digital format.
- **Inefficient Advisor Communication:** Simplifies advisor-student mapping for better academic guidance.
- **Lack of Transparency:** Both students and admins can view real-time updates and credit loads.

---

## 🔑 Admin Credentials

For demo purposes:

- **Username:** admin@uniroll.com
- **Password:** AdminUniRoll

---

## 🌐 Live Site URL

[https://uniroll.netlify.app/](https://uniroll.netlify.app/)

---

## ⚙️ Key Features

### 🧑‍🎓 Student Portal

- **Registration Management:** Students can register for courses each semester.
- **Credit Load Overview:** Instantly view total registered credits per semester.
- **Timetable Generation:** View a personalized class timetable based on registered courses.
- **Profile Dashboard:** Displays student info, registration details, and advisor assignment status.

![Student Dashboard](./assets/student_dashboard.png)

### 👨‍🏫 Advisor Portal

- **Student Overview:** Advisors can view and manage their assigned students.
- **Advisory Management:** Approve or decline student registrations if required.
- **Student Load Tracking:** Check total credits and registered courses for each student.

![Advisor Dashboard](./assets/advisor_dashboard.png)

### 🧑‍💼 Admin Dashboard

- **Comprehensive Statistics:** Instantly view total students, courses, departments, registrations, and advisors.
- **Data Management:** Add, delete, or update records for departments, courses, and advisors.
- **Sorted Listings:** Data is displayed in sorted order for clarity.
- **Secure APIs:** Passwords are never sent to the frontend.

![Admin Dashboard](./assets/admin_dashboard.png)

---

## 🧠 Technologies Used

| Layer              | Technologies                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| **Frontend**       | React.js, React Hook Form, Axios, Tailwind CSS, SweetAlert, React Icons |
| **Backend**        | Node.js, Express.js, MongoDB                                            |
| **Authentication** | Firebase                                                                |
| **Other Tools**    | Tanstack Query, Lottie React, Swiper Slider                             |

---

## 💡 Detailed Features Explanation

| Feature                        | Description                                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **Student Registration**       | Students can register for courses based on their department and semester. The total credits are automatically calculated.  |
| **Advisor Assignment**         | If a registration has no advisor, admins can assign one via a simple selection menu fetched dynamically from the database. |
| **Credit Load Tracking**       | Each registration’s total credit hours are displayed and updated dynamically.                                              |
| **Timetable View**             | The student’s registered courses generate a visual timetable.                                                              |
| **Admin Statistics Dashboard** | Displays live counts of students, departments, courses, advisors, and registrations using API endpoints.                   |
| **Department Management**      | Admins can add and view departments through a clean UI with data fetched directly from the backend.                        |

---

## 📘 User Manual

### 👩‍🎓 For Students

1. **Login or Register** using your assigned student ID.
2. **View Profile:** Access your personal dashboard showing your details and registration info.
3. **Course Registration:** Select courses for the semester and confirm registration.
4. **Check Credit Load:** See total registered credits for academic planning.
5. **Advisor Assignment:** If not assigned, request or wait for your advisor to be added by the admin.
6. **View Timetable:** Automatically generated based on your registered courses.

### 👨‍🏫 For Advisors

1. **Login** using your advisor credentials.
2. **View Assigned Students:** Access all students assigned to you.
3. **Check Student Load:** See registered courses and total credits for each student.
4. **Provide Approval:** Optionally approve or comment on student registrations.

### 🧑‍💼 For Admins

1. **Login** using the admin credentials provided above.
2. **Dashboard Overview:** Instantly see platform statistics — total students, courses, departments, and registrations.
3. **Manage Records:**
   - Add or remove departments.
   - Add new advisors via the Add Advisor form.
   - Assign advisors to students with unassigned registrations.
4. **Data Security:** Passwords are never exposed; only relevant student data is retrieved.

---

## 🖥️ To Run This Project Locally

**Simply run these commands on your terminal:**

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Anupam2570632/Uniroll.git
2. **Navigate to the Project Directory:**
   ```sh
   cd Uniroll
3. **Install Dependencies:**
   ```sh
   npm install
4. **Start the Development Server:**
   ```sh
   npm run dev
4. **Go to localhost:5173/**

    [localhost:5173/](localhost:5173/)
