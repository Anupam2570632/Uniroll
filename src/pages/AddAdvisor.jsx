import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddAdvisorForm() {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/advisors", data);
      toast.success("Advisor added successfully!");
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add advisor");
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }}>
      <Typography variant="h5" mb={3} textAlign="center">
        Add New Advisor
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="_id"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Advisor ID"
              fullWidth
              margin="normal"
              required
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Advisor Name"
              fullWidth
              margin="normal"
              required
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Advisor Email"
              fullWidth
              margin="normal"
              required
              type="email"
            />
          )}
        />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Advisor
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
