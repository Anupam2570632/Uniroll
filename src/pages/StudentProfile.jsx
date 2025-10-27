import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider/authContext";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);
  const studentId = user.studentId;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/studentProfile/${studentId}`)
      .then((res) => setProfile(res.data))
      .catch(() => toast.error("Failed to fetch student profile"));
  }, [studentId]);

  if (!profile) return <Typography textAlign="center">Loading...</Typography>;

  return (
    <Paper sx={{ p: 4, maxWidth: 800, margin: "20px auto" }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        Student Profile
      </Typography>

      {/* Student Info */}
      <Box mb={3}>
        <Typography>
          <strong>ID:</strong> {profile.student.studentId}
        </Typography>
        <Typography>
          <strong>Name:</strong> {profile.student.studentName}
        </Typography>
        <Typography>
          <strong>Department:</strong> {profile.student.dept_name}
        </Typography>
        {profile.student.currentSemester && (
          <Typography>
            <strong>Current Semester:</strong> {profile.student.currentSemester}
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Registration Info */}
      {profile.registration ? (
        <>
          <Typography variant="h6" mb={1}>
            Registration Details
          </Typography>
          <Typography>
            <strong>Semester:</strong> {profile.registration.semester}
          </Typography>
          <Typography>
            <strong>Total Credit:</strong> {profile.registration.total_credit}
          </Typography>

          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Course ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Course Name</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profile.regCourse && profile.regCourse.length > 0 ? (
                profile.regCourse.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell>{course.courseId}</TableCell>
                    <TableCell>{course.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No registered courses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <Typography color="text.secondary" textAlign="center">
          No registration data found.
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Timetable */}
      <Typography variant="h6" mb={1}>
        Timetable
      </Typography>
      {profile.timetable && profile.timetable.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Day</strong>
              </TableCell>
              <TableCell>
                <strong>Course</strong>
              </TableCell>
              <TableCell>
                <strong>Time</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profile.timetable.map((t, index) => (
              <TableRow key={index}>
                <TableCell>{t.day}</TableCell>
                <TableCell>{t.course}</TableCell>
                <TableCell>{t.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography color="text.secondary" textAlign="center">
          No timetable available.
        </Typography>
      )}
    </Paper>
  );
}
