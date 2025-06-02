import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Typography,
    Avatar,
    Button,
    Stack,
    Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance, { product } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endPoints/endpoints';
import SweetAlertComponent from '../../../components/sweetAlert/sweetAlert';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function ProductList() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.post(endPoints.cms.list);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async () => {
        const formData = new FormData();
        formData.append('id', selectedId);

        try {
            const response = await axiosInstance.post(endPoints.cms.delete, formData);
            toast.success(response.data.message);
            setOpen(false);
            fetchProducts();
        } catch (error) {
            toast.error('Delete failed!');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box
            sx={{
                px: 4,
                py: 6,
                minHeight: '100vh',
                backgroundColor: '#ffffff',
            }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
                mb={5}
                textAlign="center"
                sx={{
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                }}
            >
                <ShoppingBagIcon sx={{ fontSize: 38, color: '#ff6f00' }} />
                Product Listing
            </Typography>

            <Grid container spacing={4}>
                {data.length > 0 ? (
                    data.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item._id}>
                            <Card
                                elevation={3}
                                sx={{
                                    borderRadius: 4,
                                    backgroundColor: '#fff',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#ff6f00' }}>
                                            {item.title ? item.title.charAt(0).toUpperCase() : 'P'}
                                        </Avatar>
                                    }
                                    title={
                                        <Typography variant="h6" fontWeight={600} color="#333">
                                            {item.title}
                                        </Typography>
                                    }
                                    subheader={<Typography color="text.secondary">By Admin</Typography>}
                                />
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={
                                        item.image && item.image.trim() !== ''
                                            ? product(item.image)
                                            : 'https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png'
                                    }
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ minHeight: 60, mb: 2 }}
                                    >
                                        {item.description?.length > 120
                                            ? `${item.description.slice(0, 120)}...`
                                            : item.description || 'No description available.'}
                                    </Typography>

                                    <Stack direction="row" spacing={2} justifyContent="space-between">
                                        <Tooltip title="Delete this product">
                                            <Button
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    setSelectedId(item._id);
                                                    setOpen(true);
                                                }}
                                                sx={{
                                                    background: 'linear-gradient(135deg, #ff8a80, #ff5252)',
                                                    color: '#fff',
                                                    textTransform: 'none',
                                                    borderRadius: 2,
                                                    fontWeight: 500,
                                                    px: 2,
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #ff5252, #e53935)',
                                                    },
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Tooltip>

                                        <Tooltip title="Edit product">
                                            <Button
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                component={Link}
                                                to={`/cms/update/${item._id}`}
                                                sx={{
                                                    backgroundColor: '#ff6f00',
                                                    textTransform: 'none',
                                                    borderRadius: 2,
                                                    fontWeight: 500,
                                                    px: 2,
                                                    '&:hover': {
                                                        backgroundColor: '#e65100',
                                                    },
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" color="text.secondary">
                            No products found.
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {open && (
                <SweetAlertComponent
                    confirm={handleDelete}
                    cancle={() => setOpen(false)}
                    title="Are you sure?"
                    subtitle="You will not be able to recover this product!"
                    type="warning"
                />
            )}
        </Box>
    );
}
