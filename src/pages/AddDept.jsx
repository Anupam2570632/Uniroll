import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const AddDept = () => {
  const [dept, setDept] = useState({ _id: "", name: "" });

  const handleChange = (e) => {
    setDept({
      ...dept,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dept._id.trim() || !dept.name.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/addDept", dept);
      toast.success(res.data.message || "Department added successfully!");
      setDept({ _id: "", name: "" }); // reset form
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Department ID already exists!");
      } else if (error.response?.status === 400) {
        toast.error("Missing required fields");
      } else {
        toast.error("Failed to add department");
      }
      console.error("Add Dept Error:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9fafb",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Add Department
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Department ID"
            name="_id"
            value={dept._id}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Department Name"
            name="name"
            value={dept.name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Add Department
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddDept;
