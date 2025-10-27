import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [semesters, setSemesters] = useState([]);

  // Fetch students (with optional filters)
  const fetchStudents = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `http://localhost:3001/students?${params}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students");
    }
  };

  // Fetch department names (array of strings)
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/departments");
      setDepartments(res.data.departments); // updated line
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student");
    }
  };

  // Apply filter
  const handleFilter = () => {
    fetchStudents({
      dept_name: selectedDept,
      semester: selectedSemester,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/semesters")
      .then((res) => {
        console.log(res)
        setSemesters(res.data.semesters);
      })
      .catch(() => toast.error("Failed to fetch semesters"));
  }, []);

  console.log(semesters);

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>

      {/* Filter Controls */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Department</InputLabel>
          <Select
            value={selectedDept}
            label="Department"
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            <MenuItem value="">All Departments</MenuItem>
            {departments.map((dept, index) => (
              <MenuItem key={index} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Semester</InputLabel>
          <Select
            value={selectedSemester}
            label="Semester"
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <MenuItem value="">All Semesters</MenuItem>
            {/* <MenuItem value="Spring 2025">Spring 2025</MenuItem>
            <MenuItem value="Summer 2025">Summer 2025</MenuItem>
            <MenuItem value="Fall 2025">Fall 2025</MenuItem> */}

            {semesters.map((semester, index) => (
              <MenuItem key={index} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.dept_name}</TableCell>
                  <TableCell>{student.currentSemester || "Not yet registered"}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
