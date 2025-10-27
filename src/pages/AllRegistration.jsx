import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState({});

  // Fetch registrations
  const fetchRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:3001/registrations");
      setRegistrations(res.data);
    } catch (error) {
      toast.error("Failed to fetch registrations");
      console.error(error);
    }
  };

  // Fetch advisors
  const fetchAdvisors = async () => {
    try {
      const res = await axios.get("http://localhost:3001/advisors");
      setAdvisors(res.data);
    } catch (error) {
      toast.error("Failed to fetch advisors");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchAdvisors();
  }, []);

  // Assign advisor
  const assignAdvisor = async (registrationId) => {
    if (!selectedAdvisor[registrationId]) {
      toast.error("Please select an advisor");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:3001/registrations/${registrationId}/assign-advisor`,
        { advisor_id: selectedAdvisor[registrationId] }
      );
      toast.success("Advisor assigned successfully");
      fetchRegistrations();
    } catch (error) {
      toast.error("Failed to assign advisor");
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 1300, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Registrations
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Total Credit</TableCell>
              <TableCell>Advisor</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg._id}>
                <TableCell>{reg.student_id}</TableCell>
                <TableCell>{reg.semester}</TableCell>
                <TableCell>{reg.courses.join(", ")}</TableCell>
                <TableCell>{reg.total_credit}</TableCell>
                <TableCell>{reg.advisor_id || "Not Assigned"}</TableCell>
                <TableCell>
                  {!reg.advisor_id && (
                    <>
                      <Select
                        value={selectedAdvisor[reg._id] || ""}
                        onChange={(e) =>
                          setSelectedAdvisor((prev) => ({
                            ...prev,
                            [reg._id]: e.target.value,
                          }))
                        }
                        displayEmpty
                        sx={{ mr: 1, minWidth: 150 }}
                      >
                        <MenuItem value="" disabled>
                          Select Advisor
                        </MenuItem>
                        {advisors.map((a) => (
                          <MenuItem key={a._id} value={a._id}>
                            {a.name} ({a._id})
                          </MenuItem>
                        ))}
                      </Select>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => assignAdvisor(reg._id)}
                      >
                        Assign
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
