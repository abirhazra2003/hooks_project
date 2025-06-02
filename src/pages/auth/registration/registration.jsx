import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  IconButton,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { PhotoCamera } from "@mui/icons-material";
import axiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endpoints";

// Validation schema
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  profile_pic: yup.mixed().required("Profile picture is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("profile_pic", profileImage);
    formData.append("email", data.email);
    formData.append("password", data.password);
    setLoading(true);

    try {
      const response = await axiosInstance.post(endPoints.auth.signup, formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 10,
          mb: 6,
          borderRadius: 4,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in your details to get started
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Avatar Upload */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Box position="relative">
              <Avatar
                src={preview || ""}
                alt="Preview"
                sx={{ width: 80, height: 80 }}
                imgProps={{ loading: "lazy" }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "white",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "#f1f1f1" },
                }}
              >
                <PhotoCamera />
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  {...register("profile_pic")}
                  onChange={handleImageChange}
                />
              </IconButton>
            </Box>
          </Box>
          {errors.profile_pic && (
            <Typography color="error" variant="body2" align="center" mb={2}>
              {errors.profile_pic.message}
            </Typography>
          )}

          {/* Form Inputs */}
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            {...register("first_name")}
            error={!!errors.first_name}
            helperText={errors?.first_name?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            {...register("last_name")}
            error={!!errors.last_name}
            helperText={errors?.last_name?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#f57c00",
              color: "#fff",
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#ef6c00",
              },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>

          {/* Redirect to login */}
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <MuiLink component={Link} to="/" underline="hover" color="primary" fontWeight={500}>
                Login here
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
