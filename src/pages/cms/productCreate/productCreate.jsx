import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Grid,
    CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endpoints";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ProductCreate = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        image: yup.mixed().required("Image is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const ClickFunction = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axiosInstance.post(endPoints.cms.create, formData);
            if (response.status === 200) {
                toast.success(response.data.message || "Product created successfully!");
            } else {
                toast.error(response.data.message || "Failed to create product!");
            }
        } catch (error) {
            toast.error("An error occurred!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "100vh",
                background: "#f5f5f5",
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    backgroundColor: "#ffffff",
                    borderRadius: 4,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    px: 4,
                    py: 5,
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    gutterBottom
                    textAlign="center"
                    sx={{ color: "#333" }}
                >
                    Create Product
                </Typography>

                <form onSubmit={handleSubmit(ClickFunction)} encType="multipart/form-data">
                    <Stack spacing={3}>
                        <TextField
                            {...register("title")}
                            label="Product Title"
                            variant="outlined"
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            fullWidth
                        />

                        <TextField
                            {...register("description")}
                            label="Product Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            fullWidth
                        />

                        <Button
                            component="label"
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderStyle: "dashed",
                                color: image ? "#ff6f00" : "gray",
                                backgroundColor: "#fafafa",
                                "&:hover": {
                                    backgroundColor: "#f3f3f3",
                                    borderColor: "#ff6f00",
                                },
                                textTransform: "none",
                            }}
                        >
                            {image ? image.name : "Upload product image"}
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                {...register("image")}
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </Button>
                        {errors.image && (
                            <Typography variant="caption" color="error">
                                {errors.image.message}
                            </Typography>
                        )}

                        {image && (
                            <Box textAlign="center">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Preview"
                                    style={{
                                        maxHeight: 120,
                                        borderRadius: 8,
                                        marginTop: 8,
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={loading}
                            sx={{
                                fontWeight: 600,
                                borderRadius: "10px",
                                height: 50,
                                backgroundColor: "#ff6f00",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#e65100",
                                },
                                boxShadow: "0 4px 12px rgba(255,111,0,0.3)",
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Create Product"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Grid>
    );
};

export default ProductCreate;
