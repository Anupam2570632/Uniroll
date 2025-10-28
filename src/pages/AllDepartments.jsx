import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const AllDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newName, setNewName] = useState("");

  // ✅ Fetch all departments
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/departments");
      setDepartments(res.data.departments || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleOpen = (index, currentName) => {
    setSelectedIndex(index);
    setNewName(currentName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
    setNewName("");
  };

  // ✅ Update department and refetch list
  const handleUpdate = async () => {
    const oldName = departments[selectedIndex];

    try {
      const res = await axios.put("http://localhost:3001/departments", {
        oldName,
        newName,
      });

      if (res.status === 200) {
        toast.success("Department updated successfully!");
        handleClose();

        // ⟳ Fetch updated department list
        setLoading(true);
        await fetchDepartments();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update department");
    }
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <CircularProgress />
      </div>
    );

  return (
    <div style={{ padding: "2rem" }}>
      <Toaster position="top-right" />
      <Typography variant="h4" align="center" gutterBottom>
        All Departments
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>#</strong></TableCell>
              <TableCell><strong>Department Name</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{dept}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(index, dept)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Department Name</DialogTitle>
        <DialogContent style={{ width: 400 }}>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Department Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            disabled={!newName.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllDepartments;
