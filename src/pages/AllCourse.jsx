import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider/authContext";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null); // for update dialog
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Delete course
  const handleDelete = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:3001/deleteCourse/${_id}`);
      fetchCourses(); // refresh table
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Open update dialog
  const handleEdit = (course) => {
    setEditCourse(course);
    setOpen(true);
  };

  // Update course
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/updateCourse/${editCourse._id}`,
        editCourse
      );
      setOpen(false);
      setEditCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" mb={3}>
        All Courses
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Credit</TableCell>
              <TableCell>Offered In</TableCell>
              {user.role == "admin" && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course._id}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credit}</TableCell>
                <TableCell>{course.offered_in.join(", ")}</TableCell>
                {user.role == "admin" && (
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(course)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(course._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      {editCourse && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Update Course</DialogTitle>
          <DialogContent>
            <TextField
              label="Course ID"
              value={editCourse._id}
              fullWidth
              margin="normal"
              disabled
            />
            <TextField
              label="Course Name"
              value={editCourse.name}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setEditCourse((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              label="Credit"
              type="number"
              value={editCourse.credit}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setEditCourse((prev) => ({
                  ...prev,
                  credit: parseFloat(e.target.value),
                }))
              }
            />
            <TextField
              label="Offered In (comma separated)"
              value={editCourse.offered_in.join(", ")}
              fullWidth
              margin="normal"
              onChange={(e) =>
                setEditCourse((prev) => ({
                  ...prev,
                  offered_in: e.target.value.split(",").map((s) => s.trim()),
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
