import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/stats")
      .then((res) => setStats(res.data))
      .catch(() => toast.error("Failed to fetch admin stats"));
  }, []);

  if (!stats)
    return (
      <Typography textAlign="center" mt={4}>
        Loading statistics...
      </Typography>
    );

  const items = [
    { title: "Total Students", value: stats.students },
    { title: "Total Courses", value: stats.courses },
    { title: "Total Departments", value: stats.departments },
    { title: "Total Advisors", value: stats.advisors },
    { title: "Total Registrations", value: stats.registrations },
  ];

  return (
    <Paper sx={{ p: 4, maxWidth: 900, margin: "30px auto" }}>
      <Typography variant="h5" textAlign="center" mb={4}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 2,
                "&:hover": { backgroundColor: "#e0f7fa" },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          Updated: {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
