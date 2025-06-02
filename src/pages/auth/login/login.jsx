import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endpoints";
import { useTokenStore } from "../../../store/authStore";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const setTok = useTokenStore((state) => state.setToken);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    setLoading(true);
    try {
      const response = await axiosInstance.post(endPoints.auth.signin, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.data.first_name);
        localStorage.setItem("dp", response.data.data.profile_pic);
        setTok(response.data.token);
        navigate("/cms/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 12, display: "flex", justifyContent: "center", marginBottom: "80px" }}>
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            maxWidth: 420,
            bgcolor: "#f9fafc",
            boxShadow: "0px 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Please enter your credentials to log in.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                backgroundColor: "#FF8C00",
                '&:hover': {
                  backgroundColor: "#e07c00",
                },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Log In"}
            </Button>
          </form>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <MuiLink component={Link} to="/auth/register" underline="hover" color="primary" fontWeight={500}>
              Register here
            </MuiLink>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
