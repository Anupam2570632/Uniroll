import { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CourseListWithStudent() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/course-wise-students"
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching course-wise data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
      >
        Course-wise Student List
      </Typography>

      {courses.length === 0 ? (
        <Typography>No courses found.</Typography>
      ) : (
        courses.map((course) => (
          <Accordion key={course.course_id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500, color: "green" }}>
                {course.course_id}&nbsp;
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>{course._id}</Typography>
              <Typography sx={{ ml: 2, color: "gray" }}>
                (Total Students: {course.total_students})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {course.students.map((s, idx) => (
                  <ListItem key={idx} divider>
                    <ListItemText
                      primary={`${s.name} (${s.studentId})`}
                      secondary={`Department: ${s.dept}`}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Paper>
  );
}
