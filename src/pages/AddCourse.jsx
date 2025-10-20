import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddCourse() {
  const [courseData, setCourseData] = useState({
    _id: "",
    name: "",
    credit: "",
    offered_in: [],
  });

  const [semesterInput, setSemesterInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSemester = () => {
    if (semesterInput.trim() !== "") {
      setCourseData((prev) => ({
        ...prev,
        offered_in: [...prev.offered_in, semesterInput.trim()],
      }));
      setSemesterInput("");
    }
  };

  const handleDeleteSemester = (semester) => {
    setCourseData((prev) => ({
      ...prev,
      offered_in: prev.offered_in.filter((s) => s !== semester),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...courseData,
      credit: parseFloat(courseData.credit),
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/addCourse",
        newCourse
      );
      if (response) {
        toast.success("Course Added Successfully!");
      }

      // Optionally, reset form
      setCourseData({ _id: "", name: "", credit: "", offered_in: [] });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add course. Check console for details.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "70vh",
        // bgcolor: "#f5f5f5",
        // py: 6,
        mt: 4,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          bgcolor: "#fff",
          color: "#333",
          width: "100%",
          maxWidth: 500,
          borderRadius: 3,
          p: 4,
          border: "1px solid #ddd",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          mb={1}
          sx={{ textAlign: "center" }}
        >
          Add New Course
        </Typography>
        <Typography
          variant="body2"
          mb={3}
          sx={{ color: "#555", textAlign: "center" }}
        >
          Fill in the course details below
        </Typography>

        <Divider sx={{ mb: 3, borderColor: "#eee" }} />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Course ID"
            name="_id"
            value={courseData._id}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <TextField
            label="Course Name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <TextField
            label="Credit"
            name="credit"
            type="number"
            value={courseData.credit}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <TextField
              label="Add Offered Semester"
              value={semesterInput}
              onChange={(e) => setSemesterInput(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Button
              onClick={handleAddSemester}
              variant="contained"
              sx={{
                bgcolor: "#1976d2",
                color: "#fff",
                "&:hover": { bgcolor: "#1565c0" },
              }}
            >
              Add
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
            {courseData.offered_in.map((semester) => (
              <Chip
                key={semester}
                label={semester}
                onDelete={() => handleDeleteSemester(semester)}
                sx={{
                  bgcolor: "#e0e0e0",
                  color: "#333",
                  border: "1px solid #ccc",
                  "& .MuiChip-deleteIcon": { color: "#555" },
                  "&:hover": { bgcolor: "#d5d5d5" },
                  mb: 1,
                }}
              />
            ))}
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              color: "#fff",
              fontWeight: 600,
              borderRadius: 2,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#1565c0",
                transform: "scale(1.02)",
                transition: "0.2s ease",
              },
            }}
          >
            Save Course
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
