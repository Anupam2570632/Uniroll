import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
} from "@mui/material";
import { AuthContext } from "../Provider/AuthProvider/authContext";

export default function Registration() {
  const { control, handleSubmit, setValue } = useForm();
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);

  const { user } = useContext(AuthContext);

  // Fetch semesters
  useEffect(() => {
    axios
      .get("http://localhost:3001/semesters")
      .then((res) => setSemesters(res.data.semesters))
      .catch(() => toast.error("Failed to fetch semesters"));
  }, []);

  // Fetch courses by semester
  useEffect(() => {
    if (!selectedSemester) return;

    axios
      .get(`http://localhost:3001/courses?semester=${selectedSemester}`)
      .then((res) => setCourses(res.data))
      .catch(() => toast.error("Failed to fetch courses"));
  }, [selectedSemester]);

  // Handle course checkbox toggle with 18 credit limit
  const toggleCourse = (course) => {
    const exists = selectedCourses.find((c) => c._id === course._id);
    let updatedCourses;

    if (exists) {
      updatedCourses = selectedCourses.filter((c) => c._id !== course._id);
    } else {
      updatedCourses = [...selectedCourses, course];
    }

    const newTotalCredit = updatedCourses.reduce((sum, c) => sum + c.credit, 0);

    // ✅ Prevent credit from exceeding 18
    if (newTotalCredit > 18) {
      toast.error("Total credit cannot exceed 18!");
      return;
    }

    setSelectedCourses(updatedCourses);
    setTotalCredit(newTotalCredit);

    setValue(
      "courses",
      updatedCourses.map((c) => c._id)
    );
    setValue("total_credit", newTotalCredit);
  };

  // Submit handler
  const onSubmit = (data) => {
    if (!selectedCourses.length) {
      toast.error("Please select at least one course");
      return;
    }

    if (totalCredit > 18) {
      toast.error("Total credit cannot exceed 18!");
      return;
    }

    axios
      .post("http://localhost:3001/registrations", {
        student_id: user.studentId,
        courses: selectedCourses.map((c) => c._id),
        total_credit: totalCredit,
        semester: selectedSemester,
      })
      .then(() => {
        toast.success("Registration successful!");
        setSelectedCourses([]);
        setTotalCredit(0);
      })
      .catch(() => toast.error("Registration failed!"));
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Course Registration
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Semester Select */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="semester-label">Select Semester</InputLabel>
          <Controller
            name="semester"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="semester-label"
                value={selectedSemester}
                label="Select Semester"
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedSemester(e.target.value);
                  setSelectedCourses([]);
                  setTotalCredit(0);
                }}
              >
                {semesters.map((sem) => (
                  <MenuItem key={sem} value={sem}>
                    {sem}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Courses Checkboxes */}
        {courses.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" mb={1}>
              Select Courses
            </Typography>
            {courses.map((course) => (
              <FormControlLabel
                key={course._id}
                control={
                  <Checkbox
                    checked={selectedCourses.some((c) => c._id === course._id)}
                    onChange={() => toggleCourse(course)}
                  />
                }
                label={`${course.name} (${course.credit} cr)`}
              />
            ))}
          </Box>
        )}

        {/* Total Credit */}
        <Typography variant="body1" mb={2}>
          Total Credit: {totalCredit}
        </Typography>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
}
