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
} from "@mui/material";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    console.log(id)

    try {
      await axios.delete(`http://localhost:3001/students/${id}`);
      toast.success("Student deleted successfully");
      fetchStudents(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.studentName}</TableCell>
                <TableCell>{student.dept_name}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
