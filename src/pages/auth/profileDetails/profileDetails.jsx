import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    CircularProgress,
    Paper,
    Typography,
    Stack,
    Divider,
} from '@mui/material';
import axiosInstance, { profile_pic } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endPoints/endpoints';

const ProfileDetails = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(endPoints.auth.profileDetails);
                if (response.status === 200) {
                    setProfile(response.data.data);
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!profile) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h6" color="error">
                    Failed to load profile information.
                </Typography>
            </Box>
        );
    }

    const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`;
    const defaultProfilePic =
        'https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png';

    const imageUrl = profile.profile_pic
        ? profile_pic(profile.profile_pic)
        : defaultProfilePic;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0f4ff, #ffffff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    minWidth: 320,
                    maxWidth: 420,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary"
                    gutterBottom
                >
                    Profile Details
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Avatar
                    src={imageUrl}
                    alt={fullName}
                    sx={{
                        width: 110,
                        height: 110,
                        mx: 'auto',
                        mb: 2,
                        border: '4px solid #1976d2',
                    }}
                />

                <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={600}>
                        {fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {profile.email}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ProfileDetails;
