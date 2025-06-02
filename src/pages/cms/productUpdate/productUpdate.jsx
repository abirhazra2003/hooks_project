import React, { useEffect, useState } from "react";
import {
    Stack,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance, { product } from "../../../api/axios/axios";
import { endPoints } from "../../../api/endPoints/endpoints";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

const ProductUpdate = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const { id } = useParams();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        image: yup.string().required("Image is required"),
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const ClickFunction = async (data1) => {
        const formData = new FormData();
        formData.append("title", data1.title);
        formData.append("description", data1.description);
        if (image) {
            formData.append("image", image);
        } else {
            formData.append("image", data.image);
        }

        formData.append("id", id);

        setLoading(true);
        try {
            const response = await axiosInstance.post(endPoints.cms.update, formData);

            if (response.status === 200) {
                toast(response.data.message || "Product updated successfully!");
            } else {
                toast.error(response.data.message || "Failed to update product!");
            }
            setLoading(false);
            return response.data;
        } catch (error) {
            toast.error("An error occurred!");
            setLoading(false);
        }
    };

    const onSubmit = async () => {
        try {
            const response = await axiosInstance.get(`${endPoints.cms.details}/${id}`);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (data) {
            setValue("title", data.title);
            setValue("description", data.description);
        }
    }, [data, setValue]);

    useEffect(() => {
        onSubmit();
    }, []);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh", background: "#f4f6f8", padding: "20px" }}
        >
            <Paper style={{ width: "100%", maxWidth: 600, padding: 30, borderRadius: "12px" }}>
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    style={{ marginBottom: 30, fontWeight: "bold" }}
                >
                    Update Product
                </Typography>
                <form>
                    <TextField
                        {...register("title")}
                        placeholder="Enter product title"
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        {...register("description")}
                        placeholder="Enter product description"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        {...register("image")}
                        type="file"
                        variant="outlined"
                        onChange={(e) => setImage(e.target.files[0])}
                        error={!!errors.image}
                        helperText={errors.image?.message}
                        fullWidth
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            mb: 2,
                            padding: "10px",
                        }}
                    />
                    {image && (
                        <img
                            style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "cover",
                                marginTop: "15px",
                                borderRadius: "10px",
                            }}
                            src={URL.createObjectURL(image)}
                            alt="Product preview"
                        />
                    )}
                    {!image && data?.image && (
                        <img
                            style={{
                                height: "200px",
                                width: "100%",
                                objectFit: "cover",
                                marginTop: "15px",
                                borderRadius: "10px",
                            }}
                            src={product(data?.image)}
                            alt="Product"
                        />
                    )}
                    {!image && !data?.image && (
                        <Typography variant="body2" color="textSecondary" align="center">
                            No image selected
                        </Typography>
                    )}

                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                        {loading ? (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled
                                sx={{ padding: "10px 20px" }}
                            >
                                <CircularProgress size={24} color="white" />
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleSubmit(ClickFunction)}
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: "10px 20px",
                                    backgroundColor: "#3f51b5",
                                    "&:hover": { backgroundColor: "#303f9f" },
                                }}
                            >
                                Update Product
                            </Button>
                        )}
                    </Stack>
                </form>
            </Paper>
        </Grid>
    );
};

export default ProductUpdate;
